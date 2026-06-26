import mongoose from "mongoose";

const ConnectedToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To Database Successfully");
    } catch(error) {
        console.log(error.message);
    }
}

export default ConnectedToDatabase;