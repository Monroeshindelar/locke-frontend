import axios from "axios";
import { API_BASE_URL } from "./constants";

var settings = {
  name: "test",
  generationId: 8,
  checkpointFrequency: 2,
  voteThreshold: 51,
  difficultyMode: "EASY",
  tournamentSettings: {},
};

// PUT Request for Creating a Game using Participants ID
export const createGame = (userId) => {
  const data = settings;
  const headers = {};
  console.log(data);
  axios
    .put(
      `${API_BASE_URL}/games/squadlocke/create?participantId=${userId}`,
      data,
      headers
    )
    .then((response) => {
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
      alert("Game Created");
    })
    .catch((error) => {
      console.error("PUT request error: Unable to create game", error);
    });
};

// GET Request for getting a Games info
export const getGameInfo = (gameId) => {
  // const axios = require('axios')
  return axios
    .get(`${API_BASE_URL}/games/squadlocke/${gameId}`)
    .then((response) => {
      // console.log("Status: ", response.status);
      // console.log("Data: ", response.data);
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
      `${API_BASE_URL}/games/squadlocke/${gameId}/participants/${participantId}`
    )
    .then((response) => {
      // console.log("Status: ", response.status);
      // console.log("Data: ", response.data);
      return response.data;
    })
    .catch((err) => {
      console.error("GET request error: Unable to get participant info", err);
    });
};
