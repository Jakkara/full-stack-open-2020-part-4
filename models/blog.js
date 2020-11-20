const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
  .set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const url = config.MONGODB_URI
logger.info('Connecting to DB...')
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('Connected')
  })
  .catch(e => {
    logger.error('Error while connecting to DB.', e.message)
  })

module.exports = mongoose.model('Blog', blogSchema)
