import { Model } from 'mongoose';


export const isImage = (type: string) : boolean => {
    if(type.includes('image')) return true
    else return false
}

export const isUnique = async (schema:Model<any>, query: Object) : Promise<boolean> => {
    const result = await schema.findOne(query)
    console.log(result)
    if(result){
        return false
    }else{
        return true
    }
}