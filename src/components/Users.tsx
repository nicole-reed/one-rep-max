import { useEffect, useState } from 'react'
import { User } from "../models/user"
import { getUsers } from '../services/apiService'
import { handleError } from '../services/errorHandlerService'

interface Props {

}

export const Users = (props: Props) => {
    const [users, setUsers] = useState<User[]>([])

    const fetchAndSetUsers = async () => {
        try {
            const users = await getUsers()
            setUsers(users)
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
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
