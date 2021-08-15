import { ACCESS_TOKEN_NAME } from "../constants";


export const getAuthorizationHeader = () => {
    let headers = {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`
    };

    return headers;
}