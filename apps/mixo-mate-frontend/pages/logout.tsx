import React from 'react'
import { useAuth } from "@/clientApi/hooks/useAuth"

function Logout() {
    const { authApi } = useAuth()

    const logout = async () => {
        if (authApi) {
            await authApi.logout();
            window.location.replace('/')
        }
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Logout
