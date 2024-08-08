import { useQuery } from "react-query";
import { BASE_URL } from "../constants/baseUrl";
import axios from "axios";

export interface IDocumentParams {
    type: string;
    status?: string[];
    page?: number;
    pageSize?: number;
    from?: string;
    to?: string;
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