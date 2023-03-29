import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Exercise, exerciseSchema } from "../models/exercise"

interface Props {
    id: string
}

export const ExerciseById = (props: Props) => {
    const [exercise, setExercise] = useState<Exercise>()

    const getExercise = async () => {
        const res = await axios.get<unknown>(`https://rm-tracker-357607.uc.r.appspot.com/exercises/${props.id}`)

        const validatedExercise = exerciseSchema.parse(res.data)

        setExercise(validatedExercise)
    }

    useEffect(() => {
        getExercise()
    }, [])

    return (
        <div>
            <p>{exercise?.name}</p>
            <p>{exercise?.max} {exercise?.units}</p>
        </div>
    )
}
