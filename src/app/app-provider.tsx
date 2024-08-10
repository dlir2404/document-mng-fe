"use client"
import { notification } from "antd"
import { createContext, useContext, useEffect, useState } from "react"
import { clientAccessToken, CookieKeys } from "../../shared/constants/cookie"
import { getMe } from "../../shared/services/user"

const AppContext = createContext<{
    user: any
    token: any
    setUser: (user: any) => void
    setToken: (token: string) => void
    getProfile: (token: string) => void
}>({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    getProfile: () => { }
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

    useState(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem(CookieKeys.accessToken)
            clientAccessToken.value = accessToken || ''
        }
    })

    const getProfile = async (token: string) => {
        try {
            const rs = await getMe(token)

            if (rs.data && rs.data.id) {
                setUser(rs.data)
            }

        } catch (error: any) {
            notification.error({
                message: error?.message || "Có lỗi xảy ra"
            })
        }
    }

    useEffect(() => {
        if (clientAccessToken.value) {
            getProfile(clientAccessToken.value).then()
            setToken(clientAccessToken.value)
        }
    }, [token])

    return (
        <AppContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                getProfile
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
