import express, { Request, Response } from "express"
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()
import config from './config'
import pinsRoute from './routes/pins'
import usersRoute from './routes/users'
import cors from 'cors'

mongoose.connect(config.host, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()
app.use(cors({origin: config.origin}))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/pins', pinsRoute)
app.use('/api/users', usersRoute)

app.listen(config.port, () => console.log(`Server listening on ${config.port}`))