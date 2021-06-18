import  axios from '@/http';
import { BASE_URL } from '@/config';


/**
 * get init formdate List
 * @returns 
 */
export const getList = () => {
    return axios.get(`${BASE_URL}/common/templates/post`)
}

/**
 * get alerts list
 * @returns 
 */
export const getAlertsList = (params) => {
    return axios.get(`${BASE_URL}/common/post/list`,{
        params
    })
}

/**
 * post new aliert
 * @param {*} data 
 * @returns 
 */
export const postAliert = (data) => {
    return axios.post(`${BASE_URL}/post`,data)
}

/**
 * get alert detail
 * @param {*} id 
 * @returns 
 */
export const getAliertDetail = (id) => {
    return axios.get(`${BASE_URL}/common/post/${id}`)
}

/**
 *  get user alerts
 * @returns 
 */
export const getUserAlerts = () => {
    return axios.get(`${BASE_URL}/post?pageSize=100`)
}

/**
 *  get user alert detail
 * @returns 
 */
 export const getUserAlertDeatil = (id) => {
    return axios.get(`${BASE_URL}/post/${id}`)
}

export const putUserAlertDetail = (id, data) => {
    return axios.put(`${BASE_URL}/post/${id}`,data)
}