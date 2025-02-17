import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const { MONGO_URI } = process.env;

const connectDB = async () => {

    /* to connect database */

    try {
        await mongoose.connect(MONGO_URI/* , {
            useNewUrlParser: true,
            useUnifiedTopology: true
            } */);
        console.log('MongoDB Connected...');
        /*  process.on('SIGINT', async () => {
             await mongoose.connection.close();
             process.exit(0);
             }); */
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
export default connectDB;
