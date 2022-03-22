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

describe('UserController', function () {
    /* this.timeout(10000) //add timeout. */
    /* after(async function () { */
    /*     //App already opened connection to db */
    /*     const User = require('../../modules/user/user.model') */
    /*     const userCount = await User.countDocuments() */
    /*     console.log(`saved Users:${userCount}`) */
    /*     /1* await User.findOneAndDelete() *1/ */
    /*     console.log(`saved Users:${userCount}`) */
    /* }) */

    describe(`POST${baseUri}`, function () {
        it('should add new user', function (done) {
            //you must use function(such as express app) or a node.js http server as the foundation for your request.
            request(app)
                .post(baseUri)
                .send(UserFixture.newUser)
                .end((err, res) => {
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
})
