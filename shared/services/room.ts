import axios from "axios"
import { useQuery } from "react-query"
import { BASE_URL } from "../constants/baseUrl"

export const useGetListRoom = () => {
    return useQuery({
        queryKey: ['get_rooms'],
        queryFn: () => axios.get(BASE_URL + '/room/all')
    })
}