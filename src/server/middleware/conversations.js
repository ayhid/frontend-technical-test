const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  console.log('*****', /conversations/.test(req.url), req.url);
 
  if (/conversations/.test(req.url) && req.method === 'GET') {

    const userId = req.query?.senderId
    const result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    res.status(200).json(result)
    return;
  } else if (/conversation\/details/.test(req.url) && req.method === 'GET'){
    const conversationId = req.query?.conversationId;
    console.log('req.conversationId', conversationId)
    const result = db?.conversations?.filter(
      conv => conv.id == conversationId
    )
    res.status(200).json(result[0])
    return;
  }

  next()
}
