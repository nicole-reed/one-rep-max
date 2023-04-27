import { useContext } from "react";
import { useNavigation } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Exercises } from "../components/Exercises";


interface Props {
}

export const Profile = (props: Props) => {
    const { auth } = useContext(AuthContext);
    const navigation = useNavigation();

    if (navigation.state === "loading") {
        return <div className="App-header">Loading...</div>
    }

    return (
        <div className="App-header">
            <h2>{auth.username}</h2>
            <h3>Current Maxes</h3>
            <Exercises />
        </div>
    )
}