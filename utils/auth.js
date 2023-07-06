import jwt from 'jsonwebtoken'

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '300',
    }
  )
}

const verifyToken = (token) => {
  console.log('Verifying token:', token)

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
    console.log('Decoded token:', decoded)
    return decoded
  } catch (error) {
    return null
  }
}

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid!' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(402).send({ message: 'Token is not supplied!' })
  }
}

const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    req.status(401).send({ message: 'User is not an admin!' })
  }
}

export { signToken, isAuth, isAdmin, verifyToken }
