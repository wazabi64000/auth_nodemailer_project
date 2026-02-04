import express from "express"
import authRoutes from './routes/auth.routes.js'

import 'dotenv/config'
import { authMiddleware, authorize } from "./middleware/auth.middleware.js"

const app = express()


app.use(express.json())

app.use('/api/auth', authRoutes)
app.get('/',authMiddleware, authorize(['ADMIN', 'USER']), (req, res) => res.send('Mon API fonctionne bien '))

export default app