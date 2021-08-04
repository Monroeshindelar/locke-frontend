import axios from "axios";

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
      `http://localhost:9292/games/squadlocke/create?participantId=${userId}`,
      data,
      headers
    )
    .then((response) => {
      console.log("Status: ", response.status);
      console.log("Data: ", response.data);
      alert("Game Created");
    })
    .catch((error) => {
      console.error("Something went wrong!", error);
    });
};
