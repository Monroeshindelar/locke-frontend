import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getAuthorizationHeader } from "./ApiUtils";

// PUT Request for Creating a Game using Participants ID
export const createGame = (userId, settings) => {
  const data = settings;
  //const headers = {};
  var headers = getAuthorizationHeader();
  //console.log(data);
  return axios
    .put(
      `${API_BASE_URL}/games/squadlocke/create?participantId=${userId}`,
      data,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("PUT request error: Unable to create game", error);
    });
};

// GET Request for getting a Games info
export const getGameInfo = (gameId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(`${API_BASE_URL}/games/squadlocke/${gameId}`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get game info", err);
    });
};

// GET Request for getting game participant info
export const getParticipantInfo = (gameId, participantId) => {
  var headers = getAuthorizationHeader();
  return axios
    .get(
      `${API_BASE_URL}/games/squadlocke/${gameId}/participants/${participantId}`,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get participant info", err);
    });
};

export const getGamesByUserId = (userId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(`${API_BASE_URL}/games/squadlocke/by-userid/${userId}`, { headers })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get games for user")
    })
};