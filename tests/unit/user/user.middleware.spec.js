/** @format */

'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const sinon = require('sinon')
const httpMocks = require('node-mocks-http')

const UserModule = require('../../../modules/user/user.module')()
const UserMiddleware = UserModule.UserMiddleware
const UserService = UserModule.UserService

const Fixtures = require('../../fixtures/fixtures')
const UserFixture = Fixtures.UserFixture
const ErrorFixture = Fixtures.ErrorFixture

let req, res, next

describe('UserMiddleware', function () {
    beforeEach(function () {
        req = httpMocks.createRequest()
        res = httpMocks.createResponse()
        //spy function can be used to verify that it was succesfully called after adding the user to the backend db through the service method
        next = sinon.spy()
    })

    describe('addUser', function () {
        let createUser, createUserPromise, expectedCreatedUser, expectedError

        beforeEach(function () {
            //stub method for the UserService
            //see https://sinonjs.org/releases/latest/stubs/
            createUser = sinon.stub(UserService, 'createUser')
            //setting up fixture
            req.body = UserFixture.newUser
        })

        afterEach(function () {
            createUser.restore()
        })

        it('should succesfully create new User', function () {
            expectedCreatedUser = UserFixture.createdUser
            createUserPromise = Promise.resolve(expectedCreatedUser)
            //stubbed function is called with req body and returns promise
            createUser.withArgs(req.body).returns(createUserPromise)

            //invoking the function under test to verfy it's behavior
            UserMiddleware.addUser(req, res, next)

            //asserts that createUser() is invoked once inside addUser func
            sinon.assert.callCount(createUser, 1)

            //promise returned by stubbed function: assert if that function is handled by middleware
            return createUserPromise.then(() => {
                expect(req.response).to.be.a('object')
                //output  of promise is checked against expected output
                expect(req.response).to.deep.equal(expectedCreatedUser)
                //next is invoked once inside promise of addUser funtion
                sinon.assert.callCount(next, 1)
            })
        })
        //Failure Test Case
        it('should throw error while creating the new customer', function () {
            expectedError = ErrorFixture.unknownError

            createUserPromise = Promise.reject(expectedError)
            createUser.withArgs(req.body).returns(createUserPromise)

            UserMiddleware.addUser(req, res, next)

            sinon.assert.callCount(createUser, 1)

            return createUserPromise
                .then((result) => {
                    expect(result).to.be.undefined
                })
                .catch((error) => {
                    expect(error).to.be.a('object')
                    expect(error).to.deep.equal(expectedError)
                })
        })
    })

    describe('getUsers', function () {
        let fetchUsers, fetchUsersPromise, expectedUsers, expectedError

        beforeEach(function () {
            fetchUsers = sinon.stub(UserService, 'fetchUsers') //fetchUsers is a dependancy for middleware method getUsers
            req.body = {}
        })

        afterEach(function () {
            fetchUsers.restore()
        })

        it('should succesfully get all users', function () {
            expectedUsers = UserFixture.users
            fetchUsersPromise = Promise.resolve(expectedUsers)
            fetchUsers.returns(fetchUsersPromise)

            UserMiddleware.getUsers(req, res, next) //will be receiving a promise from service method

            sinon.assert.callCount(fetchUsers, 1)

            return fetchUsersPromise.then(function () {
                expect(req.response).to.be.a('array')
                expect(req.response.length).to.equal(expectedUsers.length)
                expect(req.response).to.deep.equal(expectedUsers)
                sinon.assert.callCount(next, 1)
            })
        })

        it('should throw error while getting all customers', function () {
            expectedError = ErrorFixture.unknownError

            fetchUsersPromise = Promise.reject(expectedError)
            fetchUsers.returns(fetchUsersPromise)

            UserMiddleware.getUsers(req, res, next)
            sinon.assert.callCount(fetchUsers, 1)

            return fetchUsersPromise.catch(function (error) {
                expect(error).to.be.a('object')
                expect(error).to.deep.equal(expectedError)
            })
        })
    })
})
