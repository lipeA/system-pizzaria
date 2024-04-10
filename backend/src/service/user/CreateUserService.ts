import prismaClient from "../../prisma"

interface UserRequest{
    name: String;
    email: String;
    password: String;
}


class CreateUserService {
    async execute({name, email, password}: UserRequest ){
        


        
        if(!email){
            throw new Error("Email incorreto.")
        }

       
        const emailExisente = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
      
    }
}


export {CreateUserService}