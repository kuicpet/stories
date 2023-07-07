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
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Check if the decoded user ia an admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Forbidden' })
    }
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }
  /*if (authorization) {
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
  }*/
}

const isAdmin = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    res.status(403).send({ succes: false, error: 'Forbidden' })
  }
}

export { signToken, isAuth, isAdmin, verifyToken }
