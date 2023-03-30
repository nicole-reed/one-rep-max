import { useEffect, useState } from 'react'
import { User } from "../models/user"
import { getUsers } from '../services/apiService'

interface Props {

}

export const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function fetchAndSetUsers() {
            const users = await getUsers()

            setUsers(users)
        }
        fetchAndSetUsers()
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
