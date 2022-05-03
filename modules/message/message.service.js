/** @format */
; (function () {
    'use strict'

    module.exports = {
        createMessage: createMessage,
        fetchReceivedMessageByUserId: fetchReceivedMessageByUserId,
        fetchSentMessageByUserId: fetchSentMessageByUserId,
        searchInAllMessages: searchInAllMessages
    }

    const MessageModel = require('./message.model')()
        .MessageModel


    /**
     * Create a new Message Function
     * @param {Object} userFrom as a userId 
     * @param {Object} userTo   as a userId
     * @param {String} text 
     * @param {Date} date 
     * @returns 
     */
    function createMessage(userFrom, userTo, text, date){
        return MessageModel.create({
            sender: userFrom,
            receiver: userTo,
            text: text,
            date: new Date()// need to be tested..!
        }).exec()
    }
    /**
     * Inbox, My Inbox Messages... me as receiver..
     * @param {Object} userId 
     * @returns {Object} All messages
     */
    function fetchReceivedMessageByUserId(userId) {
        return MessageModel.findOne({ receiver: userId })
            .populate('sender')
            .populate('receiver')
            .exec()
    }

    /**
     * 
     * Inbox, My Sent Messages... me as sender..
     * @param {Object} userId 
     * @returns {Object} All messages
     */
    function fetchSentMessageByUserId(userId) {
        return MessageModel.findOne({ sender: userId })
            .populate('sender')
            .populate('receiver')
            .exec()
    }

    /**
     * Search in all Messages for the user, as a sender OR as a reciever
     * @param {Object} userId 
     * @param {String} key 
     * @returns {Array} Array Of Matching Messages
     */
    function searchInAllMessages(userId, key) {
        return MessageModel.find({
            $and: [{
                $or: [
                    { sender: userId },
                    { receiver: userId }
                ]
            },
            {
                text: { $regex: key }
            }
            ]
        })
    }
})()