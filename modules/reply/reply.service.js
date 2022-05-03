/** @format */
;(function () {
    'use strict'

    module.exports = {
        createReply: createReply,
        fetchReceivedMessageByUserId: fetchReceivedMessageByUserId,
        fetchSentMessageByUserId: fetchSentMessageByUserId,
        searchInAllMessages: searchInAllMessages,
    }

    /**
     * [ReplyModel](./reply.model.js)
     */
    const ReplyModel = require('./reply.module')().ReplyModel

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
        return ReplyModel.create(reply)
    }
   
})()
