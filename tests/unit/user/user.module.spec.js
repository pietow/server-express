/** @format */

const chai = require('chai')
const expect = chai.expect

const UserModule = require('../../../modules/user/user.module')

describe('UserModule', () => {
    describe('user.Module', () => {
        it('should confirm UserModule function exist', () => {
            expect(UserModule).to.be.a('function')
        })
        it('should confirm UserModule function returns object', () => {
            expect(UserModule()).to.be.a('object')
        })
        it('should confirm UserController function exist', () => {
            expect(UserModule().UserController).to.be.a('function')
        })
        it('should confirm UserMiddleware object exist', () => {
            expect(UserModule().UserMiddleware).to.be.a('object')
        })
        it('should confirm UserService object exist', () => {
            expect(UserModule().UserService).to.be.a('object')
        })
        it('should confirm UserModel function exist', () => {
            expect(UserModule().UserModel).to.be.a('function')
        })
    })
})
