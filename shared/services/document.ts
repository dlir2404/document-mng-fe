import { useMutation, useQuery } from "react-query";
import { BASE_URL } from "../constants/baseUrl";
import axios from "axios";
import { notification } from "antd";

export interface IDocumentParams {
    type: string;
    status?: string[];
    page?: number;
    pageSize?: number;
    from?: string;
    to?: string;
}

export interface IUploadIncomeBody {
    file: any;
    originalNumber?: string;
    number?: string;
    arrivalDate?: string;
    signDate?: string;
    signer?: string;
    sendFrom?: string;
    sendTo?: string;
    thematic?: string;
    category?: string;
    abstract?: string;
    token?: string;
}

export interface IUploadDraftBody {
    file: any;
    abstract?: string;
    documentId?: number;
    token?: string;
}

export interface IPresentToLeader {
    leaderId: number;
    documentId: number;
    emergencyLevel: string;
    token?: string;
}

export interface IRequestProcessIncome {
    documentId?: number;
    processDirection?: string;
    deadline?: string;
    token?: string;
}

export interface IAcceptProcessIncome {
    documentId?: number;
    token?: string;
}

export interface IDenyProcessIncome {
    documentId?: number;
    returnReason?: string;
    token?: string;
}

export const useGetListDocument = (params: IDocumentParams, token: string) => {
    return useQuery({
        queryKey: ['document', params],
        queryFn: async () => {
            let endpoint = BASE_URL || process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api'
            endpoint += params.type === 'income-document' ? '/income/all' : '/going/all'

            const result = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    page: params.page || 1,
                    pageSize: params.pageSize || 10,
                    status: params.status,
                    from: params.from,
                    to: params.to
                }
            })

            return result.data
        }
    })
}

export const useUploadIncomeDocument = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IUploadIncomeBody) => {
            console.log(body.token)
            return await axios.post(BASE_URL + '/income/upload', body, {
                headers: {
                    'Authorization': 'Bearer ' + body.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess: (data: any) => {
            okFn && okFn()
        },
        onError: (error: any) => {
            errFn && errFn(error.response?.data?.message || "Có lỗi xảy ra")
            console.log(error)
        }
    })
}

export const usePresentToLeader = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async(body: IPresentToLeader) => {
            return await axios.post(BASE_URL + '/income/present-to-leader',  body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Trình lãnh đạo thành công'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.message || "Có lỗi xảy ra"
            })
        }
    })
}

export const useRequestProcessIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async(body: IRequestProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process',  body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Yêu cầu giải quyết thành công'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.message || "Có lỗi xảy ra"
            })
        }
    })
}

export const useAcceptProcessIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async(body: IAcceptProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process/accept',  body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã chấp nhận yêu cầu giải quyết'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.message || "Có lỗi xảy ra"
            })
        }
    })
}

export const useDenyProcessIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async(body: IDenyProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process/deny',  body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã từ chối yêu cầu giải quyết'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.message || "Có lỗi xảy ra"
            })
        }
    })
}

export const useUploadDraftDocument = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IUploadDraftBody) => {
            console.log(body.token)
            return await axios.post(BASE_URL + '/income/process/complete', body, {
                headers: {
                    'Authorization': 'Bearer ' + body.token,
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        onSuccess: (data: any) => {
            okFn && okFn()
        },
        onError: (error: any) => {
            errFn && errFn(error.response?.data?.message || "Có lỗi xảy ra")
            console.log(error)
        }
    })
}