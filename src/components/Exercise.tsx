import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Exercise, exerciseSchema } from "../models/exercise"
import { EditExercise } from './EditExercise'
import { Units } from '../enums/units.enum'

interface Props {
    id: string,
    name: string,
    max: number,
    units: Units
}

export const ExerciseById = (props: Props) => {
    const [exercise, setExercise] = useState<Exercise>()
    const [edit, setEdit] = useState(false)

    const getExercise = async (): Promise<void> => {
        const res = await axios.get<unknown>(`https://rm-tracker-357607.uc.r.appspot.com/exercises/${props.id}`)

        const validatedExercise = exerciseSchema.parse(res.data)

        setExercise(validatedExercise)
    }

    const closeEditModal = (): void => {
        setEdit(false);
    }

    useEffect(() => {
        getExercise()
    },)

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
        </div>
    )
}
