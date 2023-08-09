import mongoose from "mongoose";

export async function connect(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
    } catch (err) {
        console.log("Ops! Something's Wrong.");
        console.log(err);
        process.exit()
    }
    return;
}