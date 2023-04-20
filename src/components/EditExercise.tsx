import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { z } from 'zod';
import { handleError } from '../services/errorHandlerService';
import AuthContext from '../context/AuthProvider';
import { updateExercise } from '../services/apiService';
import { Units } from '../enums/units.enum';

interface Props {
    id: string;
    name: string;
    max: number;
    units: Units;
    closeEditModal: () => void;
}

const FormDataSchema = z.object({
    name: z.string().min(2),
    max: z.number().min(0),
    units: z.nativeEnum(Units),
});

type FormData = z.infer<typeof FormDataSchema>

export function EditExercise(props: Props) {
    const { auth } = useContext(AuthContext);

    // react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(FormDataSchema) });

    // function will be called after validation upon submitting form
    const submitData = async (data: FormData): Promise<void> => {
        try {
            await updateExercise(auth.token, data.name, data.max, data.units, props.id);
            props.closeEditModal()
        } catch (error) {
            handleError(error);
        }
    };

    return (

        <form onSubmit={handleSubmit(submitData)}>
            <label className='smText'> Name: </label>
            <input type="text" defaultValue={`${props.name}`} {...register('name')} />
            {errors.name && <span className='smText'>{errors.name.message}</span>}

            <label className='smText'> Max: </label>
            <input type="number" defaultValue={`${props.max}`} {...register('max', { valueAsNumber: true })} />
            {errors.max && <span className='smText'>{errors.max.message}</span>}

            <label className='smText'> Units: </label>
            <input type="units" defaultValue={`${props.units}`} {...register('units')} />
            {errors.units && <span className='smText'>{errors.units.message}</span>}

            <input type="submit" value="Save Changes" />
        </form>

    );
}
