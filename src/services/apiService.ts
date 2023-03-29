import { string, z } from "zod";
import axios from "axios";
import { Units } from "../enums/units.enum";
import { Exercise, exerciseSchema } from "../models/exercise";

interface Props {

}

const baseUrl = "https://rm-tracker-357607.uc.r.appspot.com"

const UserSchema = z.object({
    username: z.string()
});

const LoginResponseSchema = z.object({
    username: z.string(),
    token: z.string()
});

// const UserIdSchema = z.object({
//     params: z.object({
//         userid: z.string()
//     })
// });


export const getUser = async (token: string, id: string): Promise<User> => {
    const res = await axios.get(`${baseUrl}/users/${id}`, { headers: { authorization: `Bearer ${token}` } })
    const user = UserSchema.parse(res.data)

    return user
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    const res = await axios.post(`${baseUrl}/users/login`, { username, password })
    const loginResponse = LoginResponseSchema.parse(res.data)

    return loginResponse
}

export const addExercise = async (token: string, name: string, max: number, units: Units): Promise<void> => {
    await axios.post(`${baseUrl}/exercises`, { name, max, units }, { headers: { authorization: `Bearer ${token}` } })
}

export const getExercisesByUserId = async (userid: string): Promise<Exercise[]> => {
    const res = await axios.get(`${baseUrl}/users/${userid}/exercises`)
    const exercises = z.array(exerciseSchema).parse(res.data)

    return exercises
}

export type User = z.infer<typeof UserSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>