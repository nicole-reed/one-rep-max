import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContext from "../context/AuthProvider";
import Cookies from "js-cookie";
import { loginUser } from "../services/apiService";
import { handleError } from "../services/errorHandlerService";

interface Props { }

type FormData = {
    username: string;
    password: string;
}

export const LogIn = (props: Props) => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const schema: ZodType<FormData> = z.object({
        username: z.string(),
        password: z.string()
    });

    // react-hook-form 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    // function will be called after validation upon submitting form
    const submitData = async (data: FormData) => {
        try {
            const { username, token } = await loginUser(data.username, data.password)

            setAuth({ username, token })

            Cookies.set("token", token)

            navigate("/profile", { replace: true });
        } catch (error) {
           handleError(error)
        }

    };

    return (
        <div className="App-header">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(submitData)}>
                <label> Username: </label>
                <input type="username" {...register("username",)} />
                {errors.username && <span>{errors.username.message}</span>}

                <label> Password: </label>
                <input type="password" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}

                <input type="submit" />
            </form>
        </div>
    );
};
