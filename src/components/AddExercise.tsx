import { z } from "zod";
import { Units } from "../enums/units.enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { addExercise } from "../services/apiService";
import { handleError } from "../services/errorHandlerService";

interface Props {
    closeAddExerciseModal: () => void;
    triggerExercisesChange: () => void;
}

const FormDataSchema = z.object({
    name: z.string().min(2),
    max: z.number().min(0),
    units: z.nativeEnum(Units)
})

type FormData = z.infer<typeof FormDataSchema>

export const AddExercise = (props: Props) => {
    const { auth } = useContext(AuthContext);

    // react-hook-form 
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(FormDataSchema) });

    // function will be called after validation upon submitting form
    const submitData = async (data: FormData) => {
        try {
            await addExercise(auth.token, data.name, data.max, data.units)
            props.closeAddExerciseModal()
            props.triggerExercisesChange()
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div>
            <h4>Add an Exercise</h4>
            <form onSubmit={handleSubmit(submitData)}>
                <label className='smText'> Name: </label>
                <input type="text" {...register("name")} />
                {errors.name && <span className='smText'>{errors.name.message}</span>}

                <label className='smText'> Max: </label>
                <input type="number" {...register("max", { valueAsNumber: true })} />
                {errors.max && <span className='smText'>{errors.max.message}</span>}

                <label className='smText'> Units: </label>
                <input type="units" {...register("units")} placeholder="lbs/kgs" />
                {errors.units && <span className='smText'>{errors.units.message}</span>}

                <input type="submit" className="form-btn" />
            </form>
        </div>
    )
}
