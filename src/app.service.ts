import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { User, UserLoginData } from './post-models/user.dto';

const prisma = new PrismaClient()

@Injectable()
export class AppService {
  
  async getAllUsers(){
    return prisma.notepadUsers.findMany()
  }

  async getUserByEmail(email: string){
    if(!email)
      throw new HttpException('O Email é obrigatório.', 400)
    

    const user = prisma.notepadUsers.findFirstOrThrow({
      where: {
        Email: email,
      },
    }).catch(error => {throw new HttpException( 'Email não encontrado!', 404)});

    return user    
  }

  async createNewUser(createUser: User){
    return prisma.notepadUsers.create({
      data: {
        Name: createUser.Name,
        Email: createUser.Email,
        Password: createUser.Password,
        Birthday: createUser.Birthday + "T00:00:00.000Z",
        DateCreated: new Date(),
        AppTheme: createUser.AppTheme,
      }
    })
  }

  async verifyAccount(loginData: UserLoginData){
    const user = await this.getUserByEmail(loginData.Email).catch(erro => {
      throw new HttpException(erro, 500); 
    })

    if(user.Password === loginData.Password){
      return new HttpException('Usuário logado com sucesso!', 201)
    }else{
      return new HttpException('Senha incorreta', 400)
    }
  }

  async getAllAppThemes(){
    return prisma.notepadThemes.findMany()
  }

  async getAppThemeById(id: number){
    return prisma.notepadThemes.findUnique({
      where: {
        ThemeId: id
      }
    })
  }  
}
