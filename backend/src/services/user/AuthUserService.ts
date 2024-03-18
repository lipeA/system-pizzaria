import prismaCli from "../../prisma";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email, password}: AuthRequest){

       // console.log(email)

    // verifica se o email existe.
      const user = await prismaCli.user.findFirst({
        where:{
            email:email
        }
      })

      if(!user){
        throw new Error("User/password incorrect!")
      }


      // verifica se a senha esta correta.

      const passwordMath = await compare(password, user.password)

    if(!passwordMath){
        throw new Error("User/password incorrect!")
    }      


    // gerar token do usuario

    const token = sign(
      {
        name: user.name,
        email: user.email 
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"30d",
        subject: user.id
      
      }
    )

    
// se der tudo certo ira retornar 
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          token: token
        }
    }
}


export {AuthUserService}






