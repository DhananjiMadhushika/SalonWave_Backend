import {z} from 'zod'

export const CreateBranchSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string()
})

export const UpdateBranchSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional()
})