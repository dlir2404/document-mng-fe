import axios from "axios"
import { useMutation } from "react-query"
import { BASE_URL } from "../constants/baseUrl"
import { notification } from "antd"

export const useLogin = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: (params: {username: string, password: string}) => {
            return axios.post(BASE_URL + '/auth/login', { ...params })
        },
        onSuccess: (response) => {
            okFn && okFn(response.data?.token)
        },
        onError: (error: any) => {
            notification.error({
                message: error?.response.data.message || error?.message || 'Đăng nhập không thành công'
            })
            errFn && errFn()
        }
    })
}

export const getMe = (accessToken: string) => {
    return axios.get(BASE_URL + '/auth/me', {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    })
}