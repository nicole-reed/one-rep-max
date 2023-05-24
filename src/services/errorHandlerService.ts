import { ZodError } from "zod"

export const handleError = (error: unknown): void => {
    if (error instanceof ZodError) {
        console.log("invalid input")
    } else {
        console.log("something went wrong")
    }
}