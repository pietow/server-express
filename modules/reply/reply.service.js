/** @format */
;(function () {
    'use strict'

    module.exports = {
        createReply: createReply,
        getAllRepliesByMessageId: getAllRepliesByMessageId
    }

    /**
     * [ReplyModel](./reply.model.js)
     */
    const ReplyModel = require('./reply.module')().ReplyModel
    const MessageModel = require('../message/message.model')().MessageModel

    /**
     * # Create a new reply Function
     * @param {Object} reply 
     * ### reply object Beispiel:
     * ```javascript
     * {
     *  sender: ObjectId,// muss userId sein.
     *  message: ObjectId,// muss messageId sein.
     *  text: "Reply to some message..."
     * }
     * ```
     * @returns {Function} create Mongoose Function.
     */
    function createReply(reply) {
        return new Promise((resolve, reject)=>{
            // insert a new Reply
            ReplyModel.create(reply).then(rep=>{
                // push this new replyId to replies array in messages
                MessageModel.findOneAndUpdate({_id: reply.message._id}, {$push: {replies: rep._id}}).then(insertedReply=>{
                    resolve(insertedReply)
                }).catch(err=>{
                    reject(err)
                })
            }).catch(error=>{
                reject(error)
            })
        })
    }

    /**
     * # Get All Replies
     * @param {String} messageId 
     * @returns 
     */
    function getAllRepliesByMessageId(messageId){
        return ReplyModel.find({message: messageId})
    }
   
})()
