import { fireEvent, render, screen } from "@testing-library/react";
import { Exercises } from "./Exercises";
import "@testing-library/jest-dom";
import AuthContext from "../context/AuthProvider";
import { decodeToken } from "../services/tokenService";
import { getExercisesByUserId } from "../services/apiService";
import { Units } from "../enums/units.enum";
import { ExerciseById } from "./Exercise";

jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")
jest.mock("./Exercise")

describe("Exercises component", () => {
    const auth = { username: "test", token: "testoken" }
    const setAuth = () => { }

    const exercise = {
        id: "mockid",
        name: "mockname",
        max: 69,
        units: Units.Kgs,
        userid: "mockuserid"
    }

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockuserid" })
        jest.mocked(getExercisesByUserId).mockResolvedValue([exercise])
        jest.mocked(ExerciseById).mockReturnValue(<div></div>)
    })

    it("displays list of exercises", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        const listItems = await screen.findAllByRole("listitem")

        expect(listItems).toHaveLength(1)

    });

    it("renders ExercisesById component", async () => {

        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        expect(ExerciseById).toHaveBeenCalledWith({
            id: exercise.id,
            name: exercise.name,
            max: exercise.max,
            units: exercise.units,
            triggerExercisesChange: expect.any(Function),
        }, {})
    });

    it("displays correct number of buttons", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        expect(await screen.findAllByRole("button")).toHaveLength(1)
    });

    it("renders the correct text on the button when page loads", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        expect(screen.getByRole("button")).toHaveTextContent("Add Exercise")
    });

    it("will render the correct text on the button when addExercise is clicked", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        fireEvent.click(screen.getByText("Add Exercise"))

        expect(screen.getByText("Cancel")).toBeInTheDocument()
    });

    it("will render correct text when cancel button is clicked", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        fireEvent.click(screen.getByText("Add Exercise"))
        fireEvent.click(screen.getByText("Cancel"))

        expect(screen.getByRole("button")).toHaveTextContent("Add Exercise")
    })

    it("will display AddExercise component when addExercise is true", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        fireEvent.click(screen.getByText("Add Exercise"))

        expect(screen.getByRole("heading")).toHaveTextContent("Add an Exercise")
    });

    it("will NOT display AddExercise Component when addExercise is false", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Exercises />
            </AuthContext.Provider>
        )

        await screen.findAllByRole("listitem")

        fireEvent.click(screen.getByText("Add Exercise"))
        fireEvent.click(screen.getByText("Cancel"))

        expect(screen.queryByText("Add an Exercise")).toBeFalsy()
    });

});
