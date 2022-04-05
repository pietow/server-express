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
    token: '',
}

describe('UserController', function () {
    describe(`POST ${baseUri}`, function () {
        it('should add new user', function (done) {
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
                    testData.existingUser = res.body

                    done()
                })
        })
    })

    describe(`POST ${baseUri}/login`, function () {
        it('should login registered user', function (done) {
            request(app)
                .post(`${baseUri}/login`)
                .send({ username: 'piet', password: 'password' })
                .end((err, res) => {
                    testData.token = res.body.token
                    expect(res.body.token).to.be.a('string')
                    expect(res.body.token.split('.').length).to.equal(3)

                    done()
                })
        })
    })

    describe(`GET ${baseUri}`, function () {
        it('should get all users', function (done) {
            request(app)
                .get(baseUri)
                .set('authorization', `Bearer ${testData.token}`)
                .end(function (err, res) {
                    /* testData.existingUser = res.body[0] */
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
                .set('authorization', `Bearer ${testData.token}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')

                    done()
                })
        })
    })

    describe(`PUT ${baseUri}/${testData.existingUser._id}`, function () {
        it('should modify user by id', function (done) {
            request(app)
                .put(`${baseUri}/${testData.existingUser._id}`)
                .set('authorization', `Bearer ${testData.token}`)
                .send({ username: 'otto', city: 'Bielefeld' })
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.body.fname).to.equal(
                        UserFixture.createdUser.fname,
                    )
                    expect(res.body.username).to.equal('otto')
                    expect(res.body.profile).to.be.a('object')
                    expect(res.body.profile.city).to.equal('Bielefeld')
                    expect(res.body.accommodation).to.be.a('object')

                    done()
                })
        })
    })

    describe(`DELETE ${baseUri}/${testData.existingUser._id}`, function () {
        it('should delete user by id', function (done) {
            request(app)
                .delete(`${baseUri}/${testData.existingUser._id}`)
                .set('authorization', `Bearer ${testData.token}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')
                    expect(res.body.profile).to.be.a('object')
                    expect(res.body.accommodation).to.be.a('object')
                    expect(res.body._id).to.equal(testData.existingUser._id)

                    done()
                })
        })
    })
})
