import jwt from "jsonwebtoken"



export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "1d",
        });
        res.cookie("jwt", token ,{
            maxAge:24 * 60 * 60 * 1000,
            httpOnly: true, //prevent xss attacks cross-site scripting attacks
            secure: process.env.SECURE_ENV !== "development" ,
            sameSite: "strict", // CSRF  attacjs criss-site request forgery attacks

        });

return token ;


        }

