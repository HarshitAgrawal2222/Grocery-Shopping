import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Already connected
        if (mongoose.connection.readyState === 1) {
            console.log("✅ MongoDB already connected");
            return;
        }

        // Check environment variable
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined");
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "greencart",
            serverSelectionTimeoutMS: 10000,
        });

        console.log("✅ Database Connected");
        console.log("MongoDB readyState:", mongoose.connection.readyState);

    } catch (error) {
        console.error("❌ DB Error:", error.message);
        throw error;
    }
};

export default connectDB;