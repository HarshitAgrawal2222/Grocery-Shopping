import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    console.log('Origin:', req.headers.origin)
    console.log('Cookies:', req.cookies)

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized'
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (!tokenDecode.id) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized'
            })
        }

        req.userId = tokenDecode.id

        next()
    } catch (error) {
        console.log('JWT Error:', error.message)

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}

export default authUser