/** @format */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request

const app = require('../../app')

const Fixtures = require('../fixtures/fixtures')
const UserFixture = Fixtures.UserFixture

const baseUri = '/api/users'
const PasswordService = require('../../helpers/password.helper')

const testData = {
    existingUser: {},
}

describe('UserController', function () {
    describe(`POST ${baseUri}`, function () {
        it('should add new user', function (done) {
            this.timeout(10000)
            //you must use function(such as express app) or a node.js http server as the foundation for your request.
            request(app)
                .post(baseUri)
                .send(UserFixture.newUser)
                .end(async (err, res) => {
                    const bool = await PasswordService.compare(
                        'password',
                        res.body.password,
                    )
                    expect(bool).to.be.true
                    expect(res.status).to.equal(201)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.body.fname).to.equal(
                        UserFixture.createdUser.fname,
                    )

                    done()
                })
        })
    })

    describe(`GET ${baseUri}`, function () {
        it('should get all users', function (done) {
            request(app)
                .get(baseUri)
                .end(function (err, res) {
                    testData.existingUser = res.body[0]
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('array')
                    expect(res.body.length).to.not.equal(0)

                    done()
                })
        })
    })

    describe(`GET ${baseUri}/${testData.existingUser._id}`, function () {
        it('should get user by id', function (done) {
            request(app)
                .get(`${baseUri}/${testData.existingUser._id}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.deep.equal(testData.existingUser)

                    done()
                })
        })
    })
})
