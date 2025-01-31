import {z} from 'zod'

export const signUpschema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
})