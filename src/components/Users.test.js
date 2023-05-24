import { render, screen } from "@testing-library/react";
import { Users } from "./Users";
import "@testing-library/jest-dom";
import { getUsers } from "../services/apiService";

jest.mock("../services/apiService")
jest.mock("../services/errorHandlerService")

describe("Users component", () => {
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

    it("loads and displays heading", async () => {
        render(<Users />)

        await screen.findAllByRole("listitem")

        expect(screen.getByRole("heading")).toHaveTextContent("Current Users:")
    });

    it("displays list of users", async () => {
        render(<Users />)

        await screen.findAllByRole("listitem")

        expect(screen.getByRole("list")).toBeInTheDocument()
    });

    it("loads and displays correct number of users based on api response", async () => {
        render(<Users />)

        const listItems = await screen.findAllByRole("listitem")

        expect(listItems).toHaveLength(3)
    });

    it("displays username", async () => {
        render(<Users />)

        const listItems = await screen.findAllByRole("listitem")

        expect(listItems[0]).toHaveTextContent("user1")
    });

});
