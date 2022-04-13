/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const ProfileModule = require('../profile/profile.module')()
    const TokenModule = require('../token/token.module')()
    const AccommodationModule =
        require('../accommodation/accommodation.module')()
    const UserMiddleware = Module.UserMiddleware
    const JWT_Middleware = Module.JWT_Middleware
    const PassMiddleware = Module.PassMiddleware
    const ProfileMiddleware = ProfileModule.ProfileMiddleware
    const AccommodationMiddleware = AccommodationModule.AccommodationMiddleware
    const TokenMiddleware = TokenModule.TokenMiddleware

    //REGISTRATION
    router.post(
        '/',
        PassMiddleware.getHash,
        UserMiddleware.addUser,
        UserMiddleware.sendConfirmationMail,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LOGOUT
    router.post(
        '/logout',
        JWT_Middleware.authenticateJWT,
        TokenMiddleware.deleteTokenId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //LOGIN
    router.post(
        '/login',
        UserMiddleware.getUserByUserName,
        PassMiddleware.compareHash,
        JWT_Middleware.signJWT,
        JWT_Middleware.getTokenId,
        TokenMiddleware.addTokenId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //GENERATE NEW ACCESSTOKEN AND REFRESHTOKEN
    router.post(
        '/generateToken',
        JWT_Middleware.authenticateJWT,
        TokenMiddleware.deleteTokenId,
        JWT_Middleware.signJWT,
        JWT_Middleware.getTokenId,
        TokenMiddleware.addTokenId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //VERIFY USER VIA EMAIL
    router.get(
        '/:userId/confirm',
        UserMiddleware.setActive,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //RESET USER'S PASSWORD
    router.put(
        '/:userId/:password/reset', // include old password in params to secure this link
        UserMiddleware.getUserById,
        JWT_Middleware.checkHashParam,
        PassMiddleware.getHash,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //AUTHENTICATION OF ALL SUBSEQUENT ROUTES
    router.use(JWT_Middleware.authenticateJWT)

    //LIST OF USERS
    router.get('/', UserMiddleware.getUsers, (req, res) => {
        res.status(200).json(req.response)
    })

    //ONE USER
    router.get('/:userId', UserMiddleware.getUserById, (req, res) => {
        res.status(200).json(req.response)
    })

    //ONE PROFILE
    router.get(
        '/:userId/profile',
        ProfileMiddleware.getProfileByUserId,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //MODIFY USER
    router.put(
        '/:userId',
        PassMiddleware.ignorePassword,
        UserMiddleware.modifyUser,
        ProfileMiddleware.modifyProfile,
        AccommodationMiddleware.modifyAccommodation,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //DELETE USER
    router.delete('/:userId', UserMiddleware.removeUser, (req, res) => {
        res.status(200).json(req.response)
    })

    module.exports = router
})()
