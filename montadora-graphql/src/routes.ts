import {Router, Request, Response} from 'express'
import { resolvers } from './resolvers'

export const routes = Router()

routes.get('/hello', (req: Request, res:Response) => {
    res.status(200).json({hello: 'Hello REST by Rogerio Silva!'})
})







