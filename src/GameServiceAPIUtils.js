import axios from "axios";
import state from "./Home/Home";

// PUT Request for Creating a Game using Participants ID
export const createGame = () => {
  const data = {};
  const headers = {};
  axios
    .put(
      `http://localhost:9292/games/squadlocke/create?participantId=<${state.ID}>`,
      data,
      { headers }
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
