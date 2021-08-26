import { Router, Response, Request } from "express"
import Users from "../models/User"
import bcrypt from 'bcrypt'

const router : Router = Router()

router.post('/register', async (req: Request, res: Response) => {
    try{
        const { email, username } = req.body
        const password : string = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
        console.log(password);
        
        res.status(201).json(await Users.create({email, username, password}))
    }catch(error){
        console.log(error);
        throw new Error('Error')
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body
        const user = await Users.findOne({email})
        if(!user) res.status(401).json({message: 'Unauthorized'})
        const validPassword = await bcrypt.compare(
            password,
            user!.password
        )
        if(!validPassword) res.status(401).json({message: 'Unauthorized'})
        res.status(201).json(user)
    }catch(error){
        console.log(error);
        throw new Error('Error')
    }
})



export default router