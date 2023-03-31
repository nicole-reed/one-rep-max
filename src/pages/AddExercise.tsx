// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Units } from "../enums/units.enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { addExercise } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { handleError } from "../services/errorHandlerService";

interface Props {

}

const FormDataSchema = z.object({
    name: z.string().min(2),
    max: z.number().min(0),
    units: z.nativeEnum(Units)
})

type FormData = z.infer<typeof FormDataSchema>

export const AddExercise = (props: Props) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    // react-hook-form 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(FormDataSchema) });

    // function will be called after validation upon submitting form
    const submitData = async (data: FormData) => {
      try {
          await addExercise(auth.token, data.name, data.max, data.units)

          navigate("/profile", { replace: true });
      } catch (error) {
        handleError(error)
      }
    }

    return (
        <div className="App-header">
            <h2>Add an Exercise</h2>
            <form onSubmit={handleSubmit(submitData)}>
                <label> Name: </label>
                <input type="text" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}

                <label> Max: </label>
                <input type="number" {...register("max", { valueAsNumber: true })} />
                {errors.max && <span>{errors.max.message}</span>}

                <label> Units: </label>
                <input type="units" {...register("units")} placeholder="lbs/kgs" />
                {errors.units && <span>{errors.units.message}</span>}

                <input type="submit" />
            </form>
            {/* <button onClick={() => navigate("/profile")}>navigate to profile after submit</button> */}
        </div>
    )
}
