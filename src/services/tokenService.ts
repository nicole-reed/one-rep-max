import jwtDecode from "jwt-decode";
import { z } from "zod";

const DecodedJwtSchema = z.object({
    id: z.string()
});

export const decodeToken = (token: string): DecodedToken => {
    const decodedToken = jwtDecode(token)
    const validatedDecodedToken = DecodedJwtSchema.parse(decodedToken)

    return validatedDecodedToken;
}

export type DecodedToken = z.infer<typeof DecodedJwtSchema>
