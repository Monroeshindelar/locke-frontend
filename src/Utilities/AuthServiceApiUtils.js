import axios from "axios";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../constants"
import { getAuthorizationHeader } from "./ApiUtils";

/**
 * Checks if the current user is authenticated.
 * 
 * If a user has been authenticated, they will have
 * an access token in their local storage.
 */
export function isAuthenticated() {
    return localStorage.getItem(ACCESS_TOKEN_NAME) !== null;
}

/**
 * Gets full user information for currently authenticated user
 */
export const getAuthenticatedUser = () => {
    let headers = getAuthorizationHeader();

    return axios
        .get(`${API_BASE_URL}/users/me`, { headers })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Gets a users public info
 * Properties:
 * - username
 * - discriminator
 * - avatar
 */
export const getUser = (userId) => {
    return axios
        .get(`${API_BASE_URL}/users/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

