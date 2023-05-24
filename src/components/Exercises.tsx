import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthProvider";
import { Exercise } from "../models/exercise"
import { getExercisesByUserId } from "../services/apiService";
import { decodeToken } from "../services/tokenService";
import { ExerciseById } from "./Exercise";
import { AddExercise } from "./AddExercise";
import { handleError } from "../services/errorHandlerService";

interface Props {
}

export const Exercises = (props: Props) => {
    const { auth } = useContext(AuthContext);
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [addExercise, setAddExercise] = useState(false)
    const buttonText = addExercise ? "Cancel" : "Add Exercise"

    const closeAddExerciseModal = (): void => {
        setAddExercise(false);
    }

    const triggerExercisesListChange = async () => {
        const { id } = decodeToken(auth.token)
        const exercises = await getExercisesByUserId(id)
        setExercises(exercises)
    }

    useEffect(() => {
        async function fetchAndSetExercises(): Promise<void> {
            try {
                const { id } = decodeToken(auth.token)

                const exercises = await getExercisesByUserId(id)

                setExercises(exercises)
            } catch (error) {
                console.log('error', error)
                handleError(error)
            }
        }
        fetchAndSetExercises()
    }, [auth.token])

    if (addExercise === true) {
        return (
            <div className="exercise-list">
                <ul>
                    {exercises.map(exercise => (
                        <li key={exercise.id}>
                            <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesListChange} />
                        </li>
                    ))}
                </ul>
                <button onClick={() => setAddExercise(!addExercise)}>{buttonText}</button>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesListChange} />
            </div>
        )
    }

    return (
        <div className="exercise-list">
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        <ExerciseById key={exercise.id} id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesListChange} />
                    </li>
                ))}
            </ul>
            <button onClick={() => setAddExercise(!addExercise)}>{buttonText}</button>
        </div>
    )
}