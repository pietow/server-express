/** @format */
;(function () {
    'use strict'

    module.exports = {
        createMessage: createMessage,
        fetchReceivedMessageByUserId: fetchReceivedMessageByUserId,
        fetchSentMessageByUserId: fetchSentMessageByUserId,
        searchInAllMessages: searchInAllMessages,
    }

    const MessageModel = require('./message.module')().MessageModel

    /**
     * Create a new Message Function
     * @param {Object} userFrom as a userId
     * @param {Object} userTo   as a userId
     * @param {String} text
     * @param {Date} date
     * @returns
     */
    function createMessage(message) {
        return MessageModel.create(message)
    }
    /**
     * inbox, my inbox messages... me as receiver..
     * @param {object} userid
     * @returns {object} all messages
     */
    function fetchReceivedMessageByUserId(userid) {
        return MessageModel.findOne({ receiver: userid })
            .populate('sender')
            .populate('receiver')
            .populate('replies')
            .exec()
    }

    /**
     *
     * inbox, my sent messages... me as sender..
     * @param {object} userid
     * @returns {object} all messages
     */
    function fetchSentMessageByUserId(userid) {
        return MessageModel.find({ sender: userid })
            .populate('sender')
            .populate('receiver')
            .exec()
    }

    /**
     * search in all messages for the user, as a sender or as a reciever
     * @param {object} userid
     * @param {string} key
     * @returns {Array} Array Of Matching Messages
     */
    function searchInAllMessages(userId, key) {
        return MessageModel.find({
            $and: [
                {
                    $or: [{ sender: userId }, { receiver: userId }],
                },
                {
                    text: { $regex: key },
                },
            ],
        })
    }
})()
