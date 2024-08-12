"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { CookieKeys } from "../../shared/constants/cookie"
import { useRouter } from "next/navigation"

const AppContext = createContext<{
    user: any
    token: any
    setUser: (user: any) => void
    setToken: (token: string) => void
}>({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
})
export const useAppContext = function () {
    const context = useContext(AppContext)
    return context
}
export default function AppProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    /** This prop only use for re-call get profile below.  */
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem(CookieKeys.accessToken)
            setToken(accessToken || '')
        }
    }, [])

    return (
        <AppContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
