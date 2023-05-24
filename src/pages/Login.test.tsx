import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { LogIn } from "./LogIn";
import { loginUser } from "../services/apiService";

jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")

describe("Login Form", () => {

    beforeEach(() => {
        jest.mocked(loginUser).mockResolvedValue({ username: "mockusername", token: "mocktoken" })
    })

    it("renders login form with correct fields", () => {
        render(<LogIn />)

        expect(screen.getByTitle("username")).toBeInTheDocument()
        expect(screen.getByTitle("password")).toBeInTheDocument()
        expect(screen.getByTitle("submit")).toBeInTheDocument()
    })

    it("changes username input after user types", async () => {
        userEvent.setup()
        render(<LogIn />)

        const nameInput = screen.getByTitle("username")

        await userEvent.type(nameInput, "mockUsername")

        expect(nameInput).toHaveValue("mockUsername")
    })

    it("changes password input after user types", async () => {
        userEvent.setup()
        render(<LogIn />)

        const passwordInput = screen.getByTitle("password")

        await userEvent.type(passwordInput, "mockPassword")

        expect(passwordInput).toHaveValue("mockPassword")
    })

    it("calls loginUser with correct data", async () => {
        userEvent.setup()
        render(<LogIn />)

        await userEvent.type(screen.getByTitle("username"), "mockName")
        await userEvent.type(screen.getByTitle("password"), "mockPassword")

        fireEvent.click(screen.getByTitle("submit"))

        await waitFor(() => {
            expect(loginUser).toHaveBeenCalledWith("mockName", "mockPassword")
        })
    })
})