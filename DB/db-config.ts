import { PrismaClient } from "@prisma/client"
import { signUpschema } from "../schema/user"

const prisma=new PrismaClient({
    log:["query"]
})

export default prisma