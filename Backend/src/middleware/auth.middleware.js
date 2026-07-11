import jwt from "jsonwebtoken";

export const identifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided! Unauthorized access",
                success: false,
                error: "No Token Provided"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
                error: error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
}