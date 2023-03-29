import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { User } from "../models/user"

interface Props {

}

export const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([])

    const getUsers = async () => {
        const res = await axios.get(`https://rm-tracker-357607.uc.r.appspot.com/users`)

        setUsers(res.data)
    }

    console.log('users', users)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h3>Current Users:</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}
