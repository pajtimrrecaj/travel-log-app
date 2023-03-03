import React from 'react'
import { useSelector } from 'react-redux'
import './Header.css'
import PublicNav from './PublicNav'
import UserNav from './UserNav'

function Header() {
    const auth = useSelector((state) => state.auth.value)

    return auth ? <UserNav /> : <PublicNav />
}


export default Header