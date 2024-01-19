import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import {useEffect} from "react";
import {axiosPrivate} from "../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => {
                return Promise.reject(error)
            }
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error?.config
                if (error?.response?.status === 401 && !originalRequest?.sent) {
                    originalRequest.sent = true
                    const newAccessToken = await refresh()
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [auth, refresh])

    return axiosPrivate
}

export default useAxiosPrivate