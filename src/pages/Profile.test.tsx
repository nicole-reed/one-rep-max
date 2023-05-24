import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContext from "../context/AuthProvider";
import { Units } from "../enums/units.enum";
import { decodeToken } from "../services/tokenService";
import { getExercisesByUserId } from "../services/apiService";
import { Profile } from "./Profile";

jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")

describe("Profile page", () => {
    const auth = { username: "mockUsername", token: "mockToken" }
    const setAuth = () => { }

    const exercises = [
        {
            id: "mockid1",
            name: "mockname1",
            max: 69,
            units: Units.Kgs,
            userid: "mockuserid"
        },
        {
            id: "mockid2",
            name: "mockname2",
            max: 50,
            units: Units.Kgs,
            userid: "mockuserid"
        }
    ]

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockuserid" })
        jest.mocked(getExercisesByUserId).mockResolvedValue(exercises)
    })

    it("renders a heading with the logged in user's username", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Profile />
            </AuthContext.Provider>
        )
        await screen.findAllByRole("listitem")

        const heading = await screen.findAllByRole("heading")

        expect(heading[0]).toHaveTextContent(`${auth.username}`)
    })

    it("renders the Exercises component with 2 exercises", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Profile />
            </AuthContext.Provider>
        )

        const exercises = await screen.findAllByRole("listitem")

        expect(exercises).toHaveLength(2)
    })

})