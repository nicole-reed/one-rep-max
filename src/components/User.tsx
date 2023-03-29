import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User, userSchema } from "../models/user"

interface Props {
    id: string
}

export const UserById = (props: Props) => {
    const [user, setUser] = useState<User>()

    const getUser = async () => {
        const res = await axios.get<unknown>(`https://rm-tracker-357607.uc.r.appspot.com/users/${props.id}`)

        const validatedUser = userSchema.parse(res.data)

        setUser(validatedUser)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div>
            <p>{user?.username}</p>
        </div>
    )
}
