import React, { useState } from 'react'
import axios from 'axios'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const SendEmailConfirmation = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmationToken, setConfirmationToken] = useState(null)

  const sendConfimationEmail = async () => {
    try {
      await axios.get(`/api/generateToken`).then((response) => {
        if (response.status === 200) {
          console.log(response)
          const { token } = response.data

          // Create the email message
          const msg = {
            to: 'user@example.com', // User's email address
            from: 'noreply@example.com', // Your sender email address
            subject: 'Confirm Your Email',
            html: `<p>Click the following link to confirm your email:</p>
                    <a href="https://yourwebsite.com/confirm?token=${token}">Confirm Email</a>
            `,
          }

          sgMail.send(msg)
        }
      })
      setEmailSent(true)
      setConfirmationToken(token)
    } catch (error) {
      console.error('Error sending confirmation email:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {emailSent ? (
        <p>Confirmation email sent! Check your inbox.</p>
      ) : (
        <div>
          <button onClick={sendConfimationEmail}>
            Send Confirmation Email
          </button>
        </div>
      )}
    </div>
  )
}

export default SendEmailConfirmation
