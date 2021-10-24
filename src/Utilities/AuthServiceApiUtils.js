import axios from "axios";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../constants"
import { getAuthorizationHeader } from "./ApiUtils";

export function isAuthenticated() {
    return localStorage.getItem(ACCESS_TOKEN_NAME) !== null;
}

export function getUsernameWithDiscriminator(user) {
    return `${user.username}#${user.discriminator}`;
}

export const getAuthenticatedUser = () => {
    let headers = getAuthorizationHeader();

    return axios
        .get(`${API_BASE_URL}/users/me`, { headers })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

