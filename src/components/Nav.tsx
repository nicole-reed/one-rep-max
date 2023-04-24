import Cookies from "js-cookie";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

interface Props {

}

export const Nav = (props: Props) => {
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const logout = () => {
        Cookies.remove("token")
        setAuth({
            username: "",
            token: ""
        })
        navigate("/", { replace: true });
    }


    return (
        <div>
            <ul className="nav-items">

                {!auth.username &&
                    <>
                        <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
                        <li className="nav-item"><Link to="/login">Log In</Link></li>
                    </>
                }

                {auth.username &&
                    <>
                        <li className="nav-item"><Link to="/">Home</Link></li>
                        <li className="nav-item"><Link to="/profile">Profile</Link></li>
                        {/* <li className="nav-item"><Link to="/addexercise">Add Exercise</Link></li> */}
                        <button className="nav-item" onClick={() => logout()}>Log Out</button>
                    </>
                }
            </ul>
        </div>
    )
}
