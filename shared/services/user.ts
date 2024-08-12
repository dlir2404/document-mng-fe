import axios from "axios"
import { useMutation, useQuery } from "react-query"
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

export const useGetProfile = (token: string, onOk?: Function, onError?: Function) => {
    return useQuery({
        queryKey: ['get_profile', token],
        queryFn: async () => {
            const result = await axios.get(BASE_URL + '/auth/me', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            return result
        },
        onSuccess: (data: any) => {
            onOk && onOk(data.data)
        },
        onError: (error: any) => {
            console.log(error)
            onError && onError()
        }
    })
}

export const useGetUserByRole = (role: number) => {
    return useQuery({
        queryKey: ['get_user_by_key'],
        queryFn: async () =>  await axios.get(BASE_URL + `/user/all?role=${role}`),
        onSuccess: (data) => {
            return data.data.data
        }
    })
}

export const useGetListSpecialist = (roomId?: number) => {
    return useQuery({
        queryKey: ['get_specialists', roomId],
        queryFn: async () =>  {
            let endpoint = BASE_URL + '/user/all?role=3'

            if (roomId) {
                endpoint += `&roomId=${roomId}`
            }
            return await axios.get(endpoint)
        },
        onSuccess: (data) => {
            return data.data.data
        }
    })
}
