import axios from "axios";
import useAuth from "../hooks/useAuth";

const useAxiosPrivate = () => {
    const {setAuth} = useAuth()

    const axiosPrivate = axios.create({
        baseURL: 'http://localhost:8000/api/',
        withCredentials: true
    })

    axiosPrivate.interceptors.response.use(
        (response) => {
            return response
        },
        async function (error) {
            const originalRequest = error.config
            if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.endsWith('auth/refresh')) {
                originalRequest._retry = true
                try {
                    const response = await axiosPrivate.post('auth/refresh', {}, {
                        withCredentials: true
                    })
                    const { access_token, token_type, expires_in, name, is_admin } = response.data
                    setAuth({accessToken: access_token, tokenType: token_type, expiresIn: expires_in, name: name, isAdmin: is_admin})

                    axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`

                    return axiosPrivate(originalRequest)
                }
                catch (refreshError) {
                    console.error('Failed to refresh auth:', refreshError)
                    return Promise.reject(error)
                }

            }
            return Promise.reject(error)
        }
    )

    return axiosPrivate
}



export default useAxiosPrivate