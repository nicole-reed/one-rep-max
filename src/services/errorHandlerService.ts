import { ZodError } from "zod"

export const handleError = (error: unknown): void => {
    if (error instanceof ZodError) {
        alert("invalid input")
    } else {
        alert("something went wrong")
    }
}