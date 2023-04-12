import { z } from "zod";
import axios from "axios";
import { Units } from "../enums/units.enum";
import { Exercise, exerciseSchema } from "../models/exercise";
import { User, userSchema } from "../models/user";

const baseUrl = "https://rm-tracker-357607.uc.r.appspot.com"

const LoginResponseSchema = z.object({
    username: z.string(),
    token: z.string()
});

export const getUser = async (token: string, id: string): Promise<User> => {
    const res = await axios.get(`${baseUrl}/users/${id}`, { headers: { authorization: `Bearer ${token}` } })
    const user = userSchema.parse(res.data)

    return user
}

export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get(`${baseUrl}/users`)
    const users = z.array(userSchema).parse(res.data)

    return users
}

export const addUser = async (name: string, username: string, password: string): Promise<void> => {
    await axios.post(`${baseUrl}/users`, { name, username, password })
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

export type LoginResponse = z.infer<typeof LoginResponseSchema>