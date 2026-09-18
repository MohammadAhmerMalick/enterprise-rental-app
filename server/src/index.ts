import express, { type Request, type Response } from 'express'

const app = express()
const PORT = process.env.PORT ?? '8000'

app.use(express.json())

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to your TypeScript Express server!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
