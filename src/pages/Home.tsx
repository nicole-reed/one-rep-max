import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

interface Props {

}

export const Home = (props: Props) => {


    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            console.log('logged in')
        } else {
            console.log('no token')
        }
    }, [])

    return (
        <div className="App">

            <header className="App-header">
                <h1>🏋🏼‍♀️</h1>
                <h1>This is the one rep max app </h1>

            </header>
        </div>
    )
}
