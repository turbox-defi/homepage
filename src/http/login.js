import  axios from '@/http';
import { BASE_URL } from '@/config'

export const login = (data) => {
    return axios.post(`${BASE_URL}/passport/sign_in`,data)
}

export const checkLoginEmail = (email) => {
    return axios.get(`${BASE_URL}/passport/check`,{
        params: { account: email }
    })
}


export const accountsing = (data) => {
    return axios.post(`${BASE_URL}/passport/sign_up`,data)
}

export const reset_sing_email = (email) => {
    return axios.post(`${BASE_URL}/verify/sign_up/email_resend`,{ account: email })
}