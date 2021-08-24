import { Router, Response, Request } from "express"
import Pin from "../models/Pin"

const router : Router = Router()

router.post('/', async (req: Request, res: Response) => {
    try{
        const pins = await Pin.create(req.body)
        res.status(200).json(pins)
    }catch(error){
        console.log(error);
        throw new Error('Error')
    }
})

router.get('/', async (req: Request, res: Response) => {
    try{
        res.status(200).json(await Pin.find())
    }catch(error){
        console.log(error);
        throw new Error('Error')
    }
})

export default router