
const BASE_API_URL: string = 'https://icherniakov.ru/yt-course/';

const getFullUrl = (path:string):string => BASE_API_URL+path;

export const  apiConstants ={
    testAccount: getFullUrl('account/test_accounts'),
    authToken: getFullUrl('auth/token')
}

