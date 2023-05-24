import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthContext from "../context/AuthProvider";
import { Units } from "../enums/units.enum";
import { updateExercise } from "../services/apiService";
import { decodeToken } from "../services/tokenService";
import { EditExercise } from "./EditExercise";
import userEvent from '@testing-library/user-event';


jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")


describe("EditExercise component", () => {
    const auth = { username: "mockusername", token: "mocktoken" }
    const setAuth = () => { }
    const closeEditModal = () => { }

    const exercise = {
        id: "mockid",
        name: "mockname",
        max: 69,
        units: Units.Kgs,
        userid: "mockuserid"
    }

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockid" })
        jest.mocked(updateExercise).mockResolvedValue()
    })

    it("renders the form", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )

        const formElement = screen.getByTitle("form")
        expect(formElement).toBeInTheDocument()
    })

    it("renders a textbox with the correct default name", () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )

        const textboxes = screen.getAllByRole("textbox")

        expect(textboxes[0]).toHaveValue(`${exercise.name}`)
    })

    it("renders a textbox with the correct default units", () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )

        const textboxes = screen.getAllByRole("textbox")

        expect(textboxes[1]).toHaveValue(`${exercise.units}`)
    })

    it("renders a spinbutton with the name 'max' and the default max", () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )

        const spinBtn = screen.getByRole("spinbutton")

        expect(spinBtn).toHaveValue(exercise.max)
    })

    it("renders a button with the value 'Save Changes'", () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )
        const saveButton = screen.getByRole("button")

        expect(saveButton).toHaveValue("Save Changes")
    })

    it("calls updateExercise with correct data on submission of form after editing units field", async () => {
        userEvent.setup()

        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <EditExercise id={exercise.id} name={exercise.name} max={exercise.max} units={exercise.units} closeEditModal={closeEditModal} />
            </AuthContext.Provider>
        )

        await userEvent.clear(screen.getByTitle("units"))
        await userEvent.type(screen.getByTitle("units"), 'lbs')

        fireEvent.click(screen.getByText("Save Changes"))

        await waitFor(() => {
            expect(updateExercise).toHaveBeenCalledWith(
                auth.token,
                exercise.name,
                exercise.max,
                'lbs',
                exercise.id
            )
        })

    })
})