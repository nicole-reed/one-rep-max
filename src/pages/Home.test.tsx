import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "./Home";
import { getUsers } from "../services/apiService";


jest.mock("../services/tokenService")
jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")


describe("Home page", () => {
    const users = [
        {
            name: "user one",
            username: "user1",
            id: "11111"
        },
        {
            name: "user two",
            username: "user2",
            id: "22222"
        },
        {
            name: "user three",
            username: "user3",
            id: "3333"
        }
    ]

    beforeEach(() => {
        jest.mocked(getUsers).mockResolvedValue(users)
    })

    it("renders an h1 that says 'This is the one rep max app'", () => {
        render(<Home />)

        const heading = screen.getByText('This is the one rep max app')

        expect(heading).toBeInTheDocument()
    })

    it("renders the Users component with 3 users", async () => {
        render(<Home />)

        await screen.findByText("Current Users:")

        expect(await screen.findAllByRole("listitem")).toHaveLength(3)
    })
})