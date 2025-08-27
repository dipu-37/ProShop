import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (!isConnected) {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
      console.log("✅ MongoDB Connected");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;





// // MongoDB connection
// let isConnected = false;
// async function main() {
//   try {
//     if (!isConnected) {
//       await mongoose.connect(process.env.MONGODB_URL);
//       isConnected = true;
//       console.log('✅ Database connected');
//        app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`);
//  });
//     }
//   } catch (error) {
//     console.error('❌ MongoDB error:', error.message);
//   }
// }
// main();