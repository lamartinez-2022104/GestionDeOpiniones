'use strict'

import express from 'express'
import { save, search, update, deleteM } from './comment.controller.js'

const api = express.Router()

api.post('/save', save)
api.get('/search', search)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteM)

export default api