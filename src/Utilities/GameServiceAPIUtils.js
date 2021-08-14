import axios from "axios";

// PUT Request for Creating a Game using Participants ID
export const createGame = (userId, settings) => {
  const data = settings;
  const headers = {};
  //console.log(data);
  return axios
    .put(
      `http://localhost:9292/games/squadlocke/create?participantId=${userId}`,
      data,
      headers
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
  return axios
    .get(`http://localhost:9292/games/squadlocke/${gameId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get game info", err);
    });
};

// GET Request for getting game participant info
export const getParticipantInfo = (gameId, participantId) => {
  return axios
    .get(
      `http://localhost:9292/games/squadlocke/${gameId}/participants/${participantId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get participant info", err);
    });
};
