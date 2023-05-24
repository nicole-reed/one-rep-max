import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { SignUp } from "./SignUp";
import { addUser } from "../services/apiService";

jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")

describe("SignUp Form", () => {

    beforeEach(() => {
        jest.mocked(addUser).mockResolvedValue()
    })

    it("renders SignUp form with correct fields", () => {
        render(<SignUp />)

        expect(screen.getByTitle("name")).toBeInTheDocument()
        expect(screen.getByTitle("username")).toBeInTheDocument()
        expect(screen.getByTitle("password")).toBeInTheDocument()
        expect(screen.getByTitle("submit")).toBeInTheDocument()
    })

    it("changes name input after user types", async () => {
        userEvent.setup()
        render(<SignUp />)

        const nameInput = screen.getByTitle("name")

        await userEvent.type(nameInput, "mockName")

        expect(nameInput).toHaveValue("mockName")
    })

    it("changes username input after user types", async () => {
        userEvent.setup()
        render(<SignUp />)

        const usernameInput = screen.getByTitle("username")

        await userEvent.type(usernameInput, "mockUsername")

        expect(usernameInput).toHaveValue("mockUsername")
    })

    it("changes password input after user types", async () => {
        userEvent.setup()
        render(<SignUp />)

        const passwordInput = screen.getByTitle("password")

        await userEvent.type(passwordInput, "mockPassword")

        expect(passwordInput).toHaveValue("mockPassword")
    })

    it("calls addUser with correct data", async () => {
        userEvent.setup()
        render(<SignUp />)

        await userEvent.type(screen.getByTitle("name"), "mockName")
        await userEvent.type(screen.getByTitle("username"), "mockUsername")
        await userEvent.type(screen.getByTitle("password"), "mockPassword")

        fireEvent.click(screen.getByTitle("submit"))

        await waitFor(() => {
            expect(addUser).toHaveBeenCalledWith("mockName", "mockUsername", "mockPassword")
        })
    })
})