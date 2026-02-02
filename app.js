import express from "express"
import authRoutes from './routes/auth.routes.js'

import 'dotenv/config'

const app = express()


app.use(express.json())

app.use('/api/auth', authRoutes)
app.get('/', (req, res) => res.send('Mon API fonctionne bien '))

export default app