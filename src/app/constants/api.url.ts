
const BASE_API_URL: string = 'https://icherniakov.ru/yt-course/';
const AUTH_PREFIX:string ='auth/';
const ACCOUNT_PREFIX:string ='account/';

const getFullUrl = (path:string, prefix:string=''):string => BASE_API_URL+prefix+path;

const getAccountUrl =(path:string):string=>getFullUrl(path,ACCOUNT_PREFIX);

const getAuthUrl =(path:string):string=>getFullUrl(path,AUTH_PREFIX);

export const  apiConstants ={
    testAccount: getAccountUrl('test_accounts'),
    meAccount: getAccountUrl('me'),
    authToken: getAuthUrl('token'),
    refresh: getAuthUrl('refresh'),
    logout: getAuthUrl('logout'),
}

