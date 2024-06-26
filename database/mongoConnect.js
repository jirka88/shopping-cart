const mongoose = require('mongoose')
mongoose.set('runValidators', true)
mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
   console.log('Connected to MongoDB')
})
