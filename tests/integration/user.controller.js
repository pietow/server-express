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
const { comparePassword } = require('../../helpers/password.helper')

describe('UserController', function () {
    describe(`POST ${baseUri}`, function () {
        it('should add new user', function (done) {
            //you must use function(such as express app) or a node.js http server as the foundation for your request.
            request(app)
                .post(baseUri)
                .send(UserFixture.newUser)
                .end(async (err, res) => {
                    const bool = await comparePassword(
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
                    /* expect(res.body.password).to.equal( */
                    /*     UserFixture.createdUser.password, */
                    /* ) */

                    done()
                })
        })
    })

    describe(`GET ${baseUri}`, function () {
        it('should get all users', function (done) {
            request(app)
                .get(baseUri)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('array')
                    expect(res.body.length).to.not.equal(0)

                    done()
                })
        })
    })
})
