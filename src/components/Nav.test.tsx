import { render, screen } from "@testing-library/react";
import AuthContext from "../context/AuthProvider";
import { decodeToken } from "../services/tokenService";
import { Nav } from "./Nav";
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


jest.mock("../services/tokenService")

describe("Nav Component", () => {
    const auth = { username: "mockusername", token: "mocktoken" }
    const setAuth = () => { }

    beforeEach(() => {
        jest.mocked(decodeToken).mockReturnValue({ id: "mockid" })
    })

    it("renders 2 listitems when user is NOT logged in", async () => {
        render(
            <Router>
                <Nav />
            </Router>
        )

        const list = await screen.findAllByRole("listitem")

        expect(list).toHaveLength(2)
        expect(list[0]).toHaveTextContent("Sign Up")
        expect(list[1]).toHaveTextContent("Log In")
    })

    it("renders 2 listitems when user IS logged in", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Router>
                    <Nav />
                </Router>
            </AuthContext.Provider>
        )
        const list = await screen.findAllByRole("listitem")

        expect(list).toHaveLength(2)
        expect(list[0]).toHaveTextContent("Home")
        expect(list[1]).toHaveTextContent("Profile")
    })

    it("renders a log out button when user is logged in", async () => {
        render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Router>
                    <Nav />
                </Router>
            </AuthContext.Provider>
        )

        const logoutBtn = await screen.findByRole("button")

        expect(logoutBtn).toBeInTheDocument()
    })

    it("rerenders component with correct nav items after user clicks log out button", async () => {
        userEvent.setup()
        const { rerender } = render(
            <AuthContext.Provider value={{ auth, setAuth }}>
                <Router>
                    <Nav />
                </Router>
            </AuthContext.Provider>
        )

        await userEvent.click(screen.getByRole("button"))

        rerender(
            <Router>
                <Nav />
            </Router>
        )

        expect(screen.getByText("Sign Up")).toBeInTheDocument()
    })
})