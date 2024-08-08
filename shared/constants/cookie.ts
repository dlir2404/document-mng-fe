export const CookieKeys = {
    accessToken: "next-api.access-token",
    refreshToken: "next-api.refresh-token",
    userInfo: "next-api.user-info",
}

class SessionToken {
    private token = ""
    private _expiresAt = new Date().toISOString()
    get value() {
        return this.token
    }
    set value(token: string) {
        // Nếu gọi method này ở server thì sẽ bị lỗi
        if (typeof window === "undefined") {
            throw new Error("Cannot set token on server side")
        }
        this.token = token
    }
    get expiresAt() {
        return this._expiresAt
    }
    set expiresAt(expiresAt: string) {
        // Nếu gọi method này ở server thì sẽ bị lỗi
        if (typeof window === "undefined") {
            throw new Error("Cannot set token on server side")
        }
        this._expiresAt = expiresAt
    }
}

export const clientAccessToken = new SessionToken()
