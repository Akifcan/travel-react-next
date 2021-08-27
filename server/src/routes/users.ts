import { Router, Response, Request } from "express"
import { Types } from 'mongoose'
import Users from "../models/User"
import bcrypt from 'bcrypt'
import { isImage } from '../helpers'
import fileUpload from 'express-fileupload'

interface IAvatar{
    size: string
}

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

router.post('/upload-profile-photo', async (req: Request, res: Response) => {
    try{
        const { userId } = req.body
        if(req.files === null) return res.status(400).json({message: 'Choose a photo'})
        const avatar : fileUpload.UploadedFile|any = req.files?.avatar
        console.log(avatar.mimetype);
        if(!isImage(avatar.mimetype)) return res.status(400).json({message: 'You can only upload image types'})
        const imagePath : string = `user-avatars/${userId}.${avatar.mimetype.split('/')[1]}` 
        avatar.mv(`public/${imagePath}`)
        await Users.updateOne({_id: Types.ObjectId(userId)}, {avatar: imagePath})
        res.status(200).json({
            path: imagePath
        })
    }catch(error){
        console.log(error)
        res.status(400).json({message: 'Unexcepted error sorry'})
    }
})



export default router