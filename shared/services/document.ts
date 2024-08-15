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
    query?: string
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

export interface IUploadDocumentDraftBody {
    file: any;
    sendFrom?: string;
    category?: string;
    abstract?: string;
    token?: string;
}

export interface ICompleteProcessGoing {
    file: any;
    documentId?: number;
    sendFrom?: string;
    category?: string;
    emergencyLevel?: string;
    thematic?: string;
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
    specialistId?: number;
    processDirection?: string;
    deadline?: string;
    token?: string;
}

export interface IRequestProcessGoing {
    documentId?: number;
    specialistId?: number;
    processDirection?: string;
    deadline?: string;
    token?: string;
}

export interface IDenyDraft {
    specialistId?: number;
    documentId?: number;
    processDirection?: string;
    deadline?: string;
    token?: string;
}

export interface IDenyGoingDocument {
    specialistId?: number;
    documentId?: number;
    processDirection?: string;
    deadline?: string;
    token?: string;
}

export interface IAcceptProcessIncome {
    documentId?: number;
    token?: string;
}

export interface IAcceptDraft {
    documentId?: number;
    token?: string;
}

export interface IAcceptGoingDocument {
    documentId?: number;
    token?: string;
}

export interface IPublishGoingDocument {
    number?: string;
    documentId?: number;
    token?: string;
}

export interface IGetDocumentTicket {
    type: string;
    documentId?: number;
}

export interface IAcceptProcessGoing {
    documentId?: number;
    token?: string;
}

export interface IDeleteIncome {
    documentId?: number;
    token?: string;
}

export interface IDenyProcessIncome {
    documentId?: number;
    returnReason?: string;
    token?: string;
}

export interface IDenyProcessGoing {
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
                    to: params.to,
                    query: params.query
                }
            })

            return result.data
        }
    })
}

export const useGetDocumentTicket = (params: IGetDocumentTicket, token: string) => {
    return useQuery({
        queryKey: ['document', params],
        queryFn: async () => {
            let endpoint = BASE_URL || process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api'
            endpoint += params.type === 'income-document' ? '/income/document/ticket' : '/going/document/ticket'

            const result = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                params: {
                    id: params.documentId
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

export const useUploadDocumentDraft = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IUploadDocumentDraftBody) => {
            console.log(body.token)
            return await axios.post(BASE_URL + '/going/upload', body, {
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

export const useCompleteProcessGoing = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: ICompleteProcessGoing) => {
            console.log(body.token)
            return await axios.post(BASE_URL + '/going/process/complete', body, {
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
        mutationFn: async (body: IPresentToLeader) => {
            return await axios.post(BASE_URL + '/income/present-to-leader', body, {
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
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useRequestProcessIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IRequestProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Yêu cầu xử lý thành công'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useGetLastTicket = (type: string, docType: string) => {
    return useQuery({
        queryKey: ['last_ticket', type, docType],
        queryFn: async () => {
            let endpoint = BASE_URL || process.env.NEXT_PUBLIC_API || 'http://localhost:3000/api'
            endpoint += `/${docType}/last-ticket`

            const result = await axios.get(endpoint, {
                params: {
                    type: type
                }
            })

            return result.data
        }
    })
}

export const useRequestProcessGoing = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IRequestProcessGoing) => {
            return await axios.post(BASE_URL + '/going/request-process', body, {
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
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useDenyDraft = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IDenyDraft) => {
            return await axios.post(BASE_URL + '/income/draft/deny', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Dự thảo không được phê duyệt. Yêu cầu xử lý mới đã được tạo'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useDenyGoingDocument = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IDenyGoingDocument) => {
            return await axios.post(BASE_URL + '/going/document/deny', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã yêu cầu sửa đổi'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useAcceptProcessIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAcceptProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process/accept', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã chấp nhận yêu cầu xử lý'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.response.data.message || 'Có lỗi xảy ra'
            })
        }
    })
}

export const useAcceptDraft = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAcceptDraft) => {
            return await axios.post(BASE_URL + '/income/draft/accept', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã phê duyệt dự thảo'
            })
            okFn && okFn(data)
        },
        onError: (error: any) => {
            errFn && errFn()
            notification.error({
                message: error.response.data.message || "Có lỗi xảy ra"
            })
        }
    })
}

export const useAcceptGoingDocument = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAcceptGoingDocument) => {
            return await axios.post(BASE_URL + '/going/document/accept', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã phê duyệt văn bản đi'
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

export const usePublishGoingDocument = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IPublishGoingDocument) => {
            return await axios.post(BASE_URL + '/going/document/publish', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã phát hành văn bản đi'
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

export const useAcceptProcessGoing = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAcceptProcessGoing) => {
            return await axios.post(BASE_URL + '/going/request-process/accept', body, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Đã tiếp nhận xử lý văn bản'
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

export const useDeleteIncome = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IDeleteIncome) => {
            return await axios.delete(BASE_URL + `/income/${body.documentId}`, {
                headers: {
                    "Authorization": 'Bearer ' + body.token
                }
            })
        },
        onSuccess: (data: any) => {
            notification.success({
                message: 'Xóa văn bản thành công'
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
        mutationFn: async (body: IDenyProcessIncome) => {
            return await axios.post(BASE_URL + '/income/request-process/deny', body, {
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

export const useDenyProcessGoing = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IDenyProcessGoing) => {
            return await axios.post(BASE_URL + '/going/request-process/deny', body, {
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