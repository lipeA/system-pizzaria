import prismaCli from "../../prisma";
import {hash} from 'bcryptjs'
interface UserResquest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserResquest ){
      //  console.log(name)

      //verifica se o email é nulo.
      if(!email){
        throw new Error("Email incorreto.!")
      }

      // verifica se o email já esta cadastrado.
      const userAlreadyExist = await prismaCli.user.findFirst({
        where:{
            email: email
        }
      })

      if(userAlreadyExist){
        throw new Error("User already Exist")
      }


    
      // cadastrar o usuario

      const passwordhash = await hash(password, 8);

      const user = prismaCli.user.create({
        data:{
            name: name,
            email: email,
            password: passwordhash
        },
        select:{
         // dados que vao ser retornados para a view
         id: true,
         name: true,
         email: true
        }
      })

      // se tiver tudo certo, vamos devolver a variavel "user"
        return user

    }

}


export {CreateUserService}



