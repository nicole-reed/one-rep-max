import { useContext, useState } from "react";
import { useNavigation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Exercises } from "../components/Exercises";
import { AddExercise } from "../components/AddExercise";


interface Props {

}

export const Profile = (props: Props) => {
    const { auth } = useContext(AuthContext);
    const navigation = useNavigation();
    const [addExercise, setAddExercise] = useState(false)
    const buttonText = addExercise ? "Cancel" : "Add Exercise"

    const closeAddExerciseModal = (): void => {
        setAddExercise(false);
    }

    if (navigation.state === "loading") {
        return <div className="App-header">Loading...</div>
    }

    if (addExercise === true) {
        return (
            <div className="App-header">
                <h2>{auth.username}</h2>
                <h3>Current Maxes</h3>
                <Exercises />
                <button onClick={() => setAddExercise(!addExercise)}>{buttonText}</button>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} />
            </div>
        )
    }

    return (
        <div className="App-header">
            <h2>{auth.username}</h2>
            <h3>Current Maxes</h3>
            <Exercises />
            <button onClick={() => setAddExercise(!addExercise)}>{buttonText}</button>
        </div>
    )
}