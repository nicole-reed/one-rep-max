import { ReactNode, useContext } from "react";
import axios from "axios";
import { useLoaderData, useNavigation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { decodeToken } from "../services/tokenService";
import { getExercisesByUserId } from "../services/apiService";
import { Exercise } from "../models/exercise";


interface Props {

}

export const Profile = (props: Props) => {
    const { auth } = useContext(AuthContext);
    // console.log('auth', auth)
    // TODO use loaderData to fetch user's exercises right away? update routes in App.tsx as well
    // const exercises = useLoaderData() as Awaited<ReturnType<typeof dataLoader>>;
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <div className="App-header">Loading...</div>
    }

    return (
        <div className="App-header">
            <h2>Profile of {auth.username}</h2>
            <ul>
                {/* {exercises.map} */}
            </ul>
        </div>
    )
}

// instead of useEffect we use useLoaderData which loads data at the same time as the page
export const dataLoader = async (): Promise<Exercise[]> => {
    const { auth } = useContext(AuthContext);
    if (!auth.token) {
        return []
    }

    const { id } = decodeToken(auth.token)
    const exercises = await getExercisesByUserId(id)

    return exercises
}