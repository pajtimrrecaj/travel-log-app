import axios from "axios";

export const endpoints = {

    login: {
        url: 'auth/login',
        method: 'POST',
    },
    register: {
        url: 'auth/register',
        method: 'POST',
    },
    verifyAccount: {
        url: 'auth/verify-account',
        method: 'GET'
    },
    me: {
        url: 'users/me',
        method: 'GET'
    },
    requestPasswordReset: {
        url: 'auth/request-password-reset',
        method: 'POST'
    },
    resetPassword: {
        url: 'auth/reset-password',
        method: 'POST'
    },
    createPost: {
        url: 'users/create-post',
        method: 'POST'
    },
    deletePost: {
        url: 'users/delete-post',
        method: 'POST'
    },
    editPost: {
        url: 'users/edit-post',
        method: 'POST'
    },
    search: {
        url: 'users/search',
        method: 'POST'
    },
    addPlace: {
        url: 'places/add-place',
        method: 'POST'
    },
    getPlaces: {
        url: 'places/get-places',
        method: 'GET'
    }

}

const api = {
    call: async (endpoint, data = {}, token = null) => {
        try {
            const axiosConfig = token
                ? {
                    baseURL: process.env.REACT_APP_BASE_URL,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
                : { baseURL: process.env.REACT_APP_BASE_URL }

            const axiosInstance = axios.create(axiosConfig)
            console.log(axiosConfig)
            const config = {
                ...endpoint,
                data: { ...data },
            }
            const result = await axiosInstance(config)
            return result.data
        } catch (err) {
            console.log(err)
            return err.response.data
        }
    },
}

export default api