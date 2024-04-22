const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongo = null

const connectDB = async () => {
   await mongoose.disconnect()
   mongo = await MongoMemoryServer.create()
   const uri = mongo.getUri()
   await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   const db = mongoose.connection
   db.on('error', console.error.bind(console, 'MongoDB Test connection error:'))
   db.once('open', function () {
      console.log('Connected to MongoDB Test')
   })
}
const dropDB = async () => {
   if (mongo) {
      await mongoose.connection.dropDatabase()
      await mongoose.connection.close()
      await mongo.stop()
   }
}
const dropCollections = async () => {
   if (mongo) {
      const collections = mongoose.connection.collections
      for (const key in collections) {
         await collections[key].deleteMany()
      }
   }
}
module.exports = {
   connectDB,
   dropDB,
   dropCollections,
}
