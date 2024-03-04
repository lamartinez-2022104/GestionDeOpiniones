'use strict'

import express from 'express'
import { login, register, update} from './user.controller.js'

const api = express.Router()

api.post('/login', login)
api.put('/update/:id', update)
api.post('/register', register)

export default api