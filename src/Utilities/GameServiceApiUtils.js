import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getAuthorizationHeader } from "./ApiUtils";

// PUT Request for Creating a Game using Participants ID
export const createGame = (userId, settings) => {
  const data = settings;
  //const headers = {};
  var headers = getAuthorizationHeader();
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
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get games for user");
    });
};

export const joinGame = (gameId, userId) => {
  var headers = getAuthorizationHeader();

  return axios
    .post(
      `${API_BASE_URL}/games/squadlocke/${gameId}/join?participantId=${userId}`,
      null,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const startGame = (gameId) => {
  var headers = getAuthorizationHeader();
  return axios
    .post(`${API_BASE_URL}/games/squadlocke/${gameId}/start`, null, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getJoinableGames = (userId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(`${API_BASE_URL}/games/squadlocke/joinable?userId=${userId}`, {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get joinable games", err);
    });
};

// GET Request for a list of all the game generation ids
export const getGenerationIds = () => {
  var headers = getAuthorizationHeader();
  return axios
    .get(`${API_BASE_URL}/generations/game-ids/all`, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(
        "GET request error: Unable to get game generation ids",
        err
      );
    });
};

// POST Request for a participant to ready up
export const readyParticipant = (gameId, participantId) => {
  var headers = getAuthorizationHeader();
  return axios
    .post(
      `${API_BASE_URL}/games/squadlocke/${gameId}/participants/${participantId}/ready`,
      null,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("POST request error: Unable to ready participant", err);
    });
};
