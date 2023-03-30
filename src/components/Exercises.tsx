import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthProvider";
import { Exercise } from "../models/exercise"
import { getExercisesByUserId } from "../services/apiService";
import { decodeToken } from "../services/tokenService";

interface Props {

}

export const Exercises = (props: Props) => {
    const { auth } = useContext(AuthContext);
    const [exercises, setExercises] = useState<Exercise[]>([])

    useEffect(() => {
        async function fetchAndSetExercises() {
            const { id } = decodeToken(auth.token)
            const exercises = await getExercisesByUserId(id)
            setExercises(exercises)
        }
        fetchAndSetExercises()
    }, [auth.token])

    return (
        <div>
            <ul>
                {exercises.map(exercise => (
                    <li>{exercise.name}: {exercise.max} {exercise.units}</li>
                ))}
            </ul>
        </div>
    )
}