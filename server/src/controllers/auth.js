const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const keys = require('../config/keys')


module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Пользователь существует, проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userID: candidate._id,
            }, keys.jwt, { expiresIn:  60 * 60 }) // 60 * 60

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }
    } else {
        // Пользователь не существует - ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не зарегистрирован'
        })
    }
}

module.exports.register = async function (req, res) {
    // email password username
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Пользователь уже зарегистрирован - выдать ошибку
        res.status(409).json({
            message: 'Данный email уже используется!'
        })
    } else {
        // creating new user
        const salt = bcrypt.genSaltSync() // 10 default
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            username: req.body.username
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}

module.exports.profile = async function (req, res) {
    res.status(200).json({
        message: 'Success'
    })
}