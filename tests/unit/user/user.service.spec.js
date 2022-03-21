/** @format */

'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon') //used for spies, stub and mocks

const mongoose = require('mongoose')

const UserModule = require('../../../modules/user/user.module')()
const UserModel = require('../../../modules/user/user.model')
const UserService = UserModule.UserService

const Fixtures = require('../../fixtures/fixtures')
const UserFixture = Fixtures.UserFixture
const ErrorFixture = Fixtures.ErrorFixture

let UserModelMock

//should not use arrow function (lambdas) as these will loose mockas context
//lambdas lexically bind this
describe('UserService', function () {
    beforeEach(function () {
        //runs before each test in this block
        UserModelMock = sinon.mock(UserModel)
    })

    afterEach(function () {
        //mocked UserModel function will be restored, e.g. the mongoose.model('users', UserSchema)
        UserModelMock.restore()

        //clear the mongoose model/schemas that are compiled/created during
        //the test run
        mongoose.models = {}
        mongoose.modelSchemas = {}

        return mongoose.connection.close()
    })
    //first Test Suite
    describe('createUser', function () {
        let newUser, expectedCreatedUser, expectedError
        it('should succesfully create new user', function () {
            newUser = UserFixture.newUser
            expectedCreatedUser = UserFixture.expectedCreatedUser

            //mocking function
            //create function which requires an user object and returns a promise
            UserModelMock.expects('create')
                .withArgs(newUser)
                .resolves(expectedCreatedUser)

            //invoke the createUser method of UserService and verify all the expectations on the mock
            return UserService.createUser(newUser).then((data) => {
                UserModelMock.verify()
                expect(data).to.deep.equal(expectedCreatedUser)
            })
        })
        it('should throw error while creating user', function () {
            expectedError = ErrorFixture.unknownError
            newUser = UserFixture.newUser

            UserModelMock.expects('create')
                .withArgs(newUser)
                .rejects(expectedError)

            return UserService.createUser(newUser).catch((error) => {
                UserModelMock.verify()
                expect(error).to.deep.equal(expectedError)
            })
        })
    })
})
