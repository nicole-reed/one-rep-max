import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface Props {

}

type FormData = {
    name: string;
    username: string;
    password: string;
}

export const SignUp = (props: Props) => {

    const schema: ZodType<FormData> = z.object({
        name: z.string().min(2),
        username: z.string(),
        password: z.string()
    });

    // react-hook-form 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    // function will be called after validation upon submitting form
    const submitData = async (data: FormData) => {
        const res = await axios.post('https://rm-tracker-357607.uc.r.appspot.com/users', data)
        console.log("data", data)
        console.log("res", res.data)
        // TODO on success redirect to login or just straight to profile
    }

    return (
        <div className="App-header">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit(submitData)}>
                <label> Name: </label>
                <input type="name" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}

                <label> Username: </label>
                <input type="username" {...register("username",)} />
                {errors.username && <span>{errors.username.message}</span>}

                <label> Password: </label>
                <input type="password" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}

                <input type="submit" />
            </form>
        </div>
    )
}