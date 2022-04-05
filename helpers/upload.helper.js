/** @format */

const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const connectionString = require('../modules/mongodb/mongodb.module')
    .MongoDBUtil.connectionString

const storage = new GridFsStorage({
    url: connectionString,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            if (
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png'
            ) {
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'profilePhotos',
                    metadata: { profileId: req.params.userId },
                }
                req.response = fileInfo
                resolve(req.response)
            } else {
                reject(new Error('Please upload a .jpg or .png file'))
            }
        })
    },
})
const upload = multer({ storage: storage })

module.exports = {
    upload: upload,
}
