import { useContext, useEffect, useState } from 'react'
import { Exercise } from "../models/exercise"
import { EditExercise } from './EditExercise'
import { Units } from '../enums/units.enum'
import AuthContext from '../context/AuthProvider'
import { decodeToken } from '../services/tokenService'
import { deleteExercise, getExerciseById } from '../services/apiService'

interface Props {
    id: string;
    name: string;
    max: number;
    units: Units;
    triggerExercisesChange: () => void;
}

export const ExerciseById = (props: Props) => {
    const { auth } = useContext(AuthContext);
    const [exercise, setExercise] = useState<Exercise>()
    const [edit, setEdit] = useState(false)

    const getExercise = async (): Promise<void> => {
        const exercise = await getExerciseById(props.id)
        setExercise(exercise)
    }

    const handleDelete = async (): Promise<void> => {
        const loggedInUser = decodeToken(auth.token)
        const exerciseUserId = exercise?.userid

        if (exercise && loggedInUser.id === exerciseUserId) {
            await deleteExercise(auth.token, exercise.id)
            props.triggerExercisesChange()
        }
    }

    const closeEditModal = (): void => {
        setEdit(false);
    }

    useEffect(() => {
        getExercise()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //TODO fix the styling here
    if (edit === true) {
        return (
            <div className='exercise'>
                <EditExercise id={props.id} name={props.name} max={props.max} units={props.units} closeEditModal={closeEditModal} />
                <button className='cancel-btn' onClick={() => setEdit(false)}>Cancel</button>
            </div>
        )
    }
    return (
        <div className='exercise'>

            <p>{exercise?.name}</p>
            <p>{exercise?.max} {exercise?.units}</p>

            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    )
}
