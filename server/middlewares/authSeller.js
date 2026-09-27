// import jwt from 'jsonwebtoken';

// const authSeller = async (req , res, next) =>{
//     const {sellerToken} = req.cookies;

//     if(!sellerToken){
//         return res.json({ success:false,message:"Not Authorized"});
//     }

//     try {
//         const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

//         if (tokenDecode.email === process.env.SELLER_EMAIL) {
//             next();
//         } else {
//             return res.json({ success: false, message: 'Not Authorized' });
//         }


//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export default authSeller;

import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    console.log("🍪 sellerToken exists:", !!sellerToken);

    if (!sellerToken) {
        return res.json({
            success: false,
            message: "Seller token missing"
        });
    }

    try {
        const tokenDecode = jwt.verify(
            sellerToken,
            process.env.JWT_SECRET
        );

        console.log("🔐 Token email:", tokenDecode.email);
        console.log("📧 Expected email:", process.env.SELLER_EMAIL);

        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({
                success: false,
                message: "Seller email does not match"
            });
        }

    } catch (error) {
        console.error("❌ JWT Error:", error.message);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

export default authSeller;