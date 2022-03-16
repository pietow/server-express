/** @format */
const chai = require('chai')
const expect = chai.expect

const MongoDBUtil =
    require('../../../modules/mongodb/mongodb.module').MongoDBUtil

describe('MongoDBUtil', () => {
    describe('mongodb.util file', () => {
        it('should read the mongodb.util file', () => {
            expect(MongoDBUtil).to.be.a('object')
        })

        it('should confirm init function exist', () => {
            expect(MongoDBUtil.init).to.be.a('function')
        })
    })
})
