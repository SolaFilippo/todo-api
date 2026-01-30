import { prisma } from "../utils/prisma"
import { userSchema } from "../schemas/user.schema"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

export const createUser =  async (req: Request, res: Response) => {
    const body = userSchema.parse(req.body)
    const { email, password } = body;

    const bcryptPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            password: bcryptPassword
        }
    })
    
    const { password: _, ...userWithoutPassword } = newUser;
    return res.json(userWithoutPassword)
}

export const readAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    const safeUsers = users.map(({ password, ...user }) => user);
    return res.json(safeUsers);
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body 
    if( !email || !password){
        return res.status(400).json({message: "credentials required"});
    }
    const user = await prisma.user.findFirst({ where: { email }});

    if(!user){
        return res.status(404).json({message: "user not found"});
    }
   const isPasswordRight = await bcrypt.compare(password, user.password);
    if(!isPasswordRight){
        return res.status(200).json({message: "Wrong Password"});
    }
    const {password: _, ...userWithoutPassword} = user
    return res.json({message: "logged", user: userWithoutPassword});
}

export const updateUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { password, ...userWithoutPassword } = userSchema.partial().parse(req.body);
    const dataToUpdate: any = { ...userWithoutPassword };

    if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        dataToUpdate.password = hashedPassword;
        }
    const user = await prisma.user.update({where: { id },data: dataToUpdate});
    return res.json(userWithoutPassword)
}

export const delUser = async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const user = await prisma.user.delete({ where: { id }})
    return res.json(user);
}