import mongoose from "mongoose";
import dns from "dns";
dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> {
            console.log("Successfully connected to MongoDB Atlas Database."); 
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
    } catch (error) {
        console.log(`MongoDB Connection Failed : `,error.message);
        process.exit(1); 
        
    }
}
export default connectDB