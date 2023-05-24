import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import AuthContext from "../context/AuthProvider";
import { addExercise } from "../services/apiService";
import { decodeToken } from "../services/tokenService";
import { AddExercise } from "./AddExercise";
import { Units } from "../enums/units.enum";


jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")



describe("AddExercise component", () => {
    const auth = { username: "mockusername", token: "mocktoken" }
    const setAuth = () => { }
    const closeAddExerciseModal = () => { }
    const triggerExercisesChange = () => { }

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockid" })
        jest.mocked(addExercise).mockResolvedValue()
    })

    it("renders the form", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const formElement = screen.getByTitle("form")
        expect(formElement).toBeInTheDocument()
    })

    it("renders all fields and button", () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        expect(screen.getByTitle("name")).toBeInTheDocument()
        expect(screen.getByTitle("max")).toBeInTheDocument()
        expect(screen.getByTitle("units")).toBeInTheDocument()
        expect(screen.getByRole("button")).toHaveValue("Add Exercise")
    })

    it("changes name input value after user types", async () => {
        userEvent.setup()
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const nameInput = screen.getByTitle("name")

        await userEvent.type(nameInput, 'mockName')

        expect(nameInput).toHaveValue("mockName")
    })

    it("displays error message if name less than 2 characters", async () => {
        userEvent.setup()
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const nameInput = screen.getByTitle("name")

        await userEvent.type(nameInput, 'm')

        fireEvent.click(screen.getByText("Add Exercise"))

        const errorMsg = await screen.findByTitle("nameError")

        expect(errorMsg).toHaveTextContent("String must contain at least 2 character(s)")
    })

    it("allows user to type a number into max field", async () => {
        userEvent.setup()
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const maxInput = screen.getByTitle("max")

        await userEvent.type(maxInput, '10')

        expect(maxInput).toHaveValue(10)
    })

    it("renders error message if max is not a number'", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const maxInput = screen.getByTitle("max")

        await userEvent.type(maxInput, 'invalidMax')

        fireEvent.click(screen.getByText("Add Exercise"))

        const errorMsg = await screen.findByTitle("maxError")

        expect(errorMsg).toHaveTextContent("Expected number, received nan")
    })

    it("allows user to enter correct units case insensitive", async () => {
        userEvent.setup()

        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        const unitsInput = screen.getByTitle("units")

        await userEvent.type(unitsInput, 'kgs')

        expect(unitsInput).toHaveValue(Units.Kgs)

    })


    it("renders error message if units is not correct format", async () => {
        userEvent.setup()

        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )
        const unitsInput = screen.getByTitle("units")

        await userEvent.type(unitsInput, 'invalidUnit')

        fireEvent.click(screen.getByText("Add Exercise"))

        const errorMsg = await screen.findByTitle("unitsError")

        expect(errorMsg).toHaveTextContent("Invalid enum value. Expected 'kgs' | 'lbs', received 'invalidUnit'")

    })

    it("calls addExercise with correct data on submission of form", async () => {
        userEvent.setup()

        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <AddExercise closeAddExerciseModal={closeAddExerciseModal} triggerExercisesChange={triggerExercisesChange} />
            </AuthContext.Provider>
        )

        await userEvent.type(screen.getByTitle("name"), 'mockName')
        await userEvent.type(screen.getByTitle("max"), '10')
        await userEvent.type(screen.getByTitle("units"), 'kgs')

        fireEvent.click(screen.getByText("Add Exercise"))


        await waitFor(() => {
            expect(addExercise).toHaveBeenCalledWith(
                auth.token,
                'mockName',
                10,
                'kgs'
            )
        })

    })
})