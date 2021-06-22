export const TOKENID = 'TOKENID';

export const BASE_URL = '/fbi';

export const email_reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

export const pwd_reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,23}$/;


let cookieDoman = ``
if(process.env.NODE_ENV !== 'development'){
    cookieDoman = `.turbox.io`
}

export const domanUrl = cookieDoman;