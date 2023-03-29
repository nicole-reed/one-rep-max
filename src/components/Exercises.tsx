import axios from "axios"
import { useEffect, useState } from "react"
import { Exercise } from "../models/exercise"

interface Props {

}

export const Exercises = (props: Props) => {
    const [exercises, setExercises] = useState<Exercise[]>([])

    const getUsers = async () => {
        const res = await axios.get(`https://rm-tracker-357607.uc.r.appspot.com/exercises`)

        setExercises(res.data)
    }

    console.log("exercises", exercises)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h3>Here are all the current exercises</h3>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>{exercise.name}</li>
                ))}
            </ul>
        </div>
    )
}