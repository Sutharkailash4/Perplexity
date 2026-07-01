export const sendMessageController = async () => {
    try {

    } catch(error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error : error.message
        })
    }
}
 