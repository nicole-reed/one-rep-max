import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContext from "../context/AuthProvider";
import { decodeToken } from "../services/tokenService";
import { getExerciseById } from "../services/apiService"
import { Units } from "../enums/units.enum";
import { ExerciseById } from "./Exercise";


jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")


describe("ExerciseById component", () => {
    const auth = { username: "mockusername", token: "mocktoken" }
    const setAuth = () => { }
    const triggerExercisesChange = () => { }

    const exercise = {
        id: "mockid",
        name: "mockname",
        max: 69,
        units: Units.Kgs,
        userid: "mockuserid"
    }

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockid" })
        jest.mocked(getExerciseById).mockResolvedValue(exercise)
    })

    it("renders the exercise name", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const exerciseName = await screen.findByText(`${exercise.name}`)

        expect(exerciseName).toBeInTheDocument()
    })

    it("renders the exercise max and units", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const exerciseStats = await screen.findByText(`${exercise.max} ${exercise.units}`)

        expect(exerciseStats).toBeInTheDocument()
    })

    it("renders a button with the text 'Edit'", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        await screen.findByText(`${exercise.name}`)
        const editBtn = await screen.findByText("Edit")

        expect(editBtn).toBeInTheDocument()
    })

    it("renders a button with the text 'Delete'", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        await screen.findByText(`${exercise.name}`)
        const deleteBtn = await screen.findByText("Delete")

        expect(deleteBtn).toBeInTheDocument()
    })

    it("after clicking 'Edit' there should be a 'Cancel' button", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        await screen.findByText(`${exercise.name}`)

        fireEvent.click(screen.getByText("Edit"))

        const cancelBtn = await screen.findByText("Cancel")

        expect(cancelBtn).toBeInTheDocument()

    })

    it("after clicking 'Edit' then 'Cancel' there should be 2 buttons again", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <ExerciseById id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        await screen.findByText("Edit")

        fireEvent.click(screen.getByText("Edit"))
        fireEvent.click(screen.getByText("Cancel"))

        const btns = await screen.findAllByRole("button")

        expect(btns).toHaveLength(2)
    })

})