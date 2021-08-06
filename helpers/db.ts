import mongoose from 'mongoose'

export default async (): Promise<void> => {
  // Bail if already connected
  if (mongoose.connections[0].readyState) return

  // Connect if not connected
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to database.')
  } catch (error) {
    console.log('DB error', error)
  }
}
