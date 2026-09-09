import mongoose from 'mongoose'

export async function connectDB(uri) {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(uri)
    console.log(`[studyflow] MongoDB connected → ${mongoose.connection.name}`)
  } catch (err) {
    console.error('[studyflow] MongoDB connection failed:', err.message)
    console.error('[studyflow] Check MONGODB_URI in server/.env — is MongoDB running?')
    process.exit(1)
  }
}
