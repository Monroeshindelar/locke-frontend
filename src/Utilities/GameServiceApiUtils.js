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

export const joinGame = (gameId, userId, versionId, starterId) => {
  var headers = getAuthorizationHeader();

  return axios
    .post(
      `${API_BASE_URL}/games/squadlocke/${gameId}/join?participantId=${userId}&versionId=${versionId}&starterId=${starterId}`,
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

export const getEncounter = (gameId, participantId, locationId, encounterMode, filterSpeciesClause = false) => {
  var headers = getAuthorizationHeader();

  return axios
    .post(
      `${API_BASE_URL}/games/squadlocke/${gameId}/encounter?participantId=${participantId}&locationId=${locationId}&encounterMode=${encounterMode}&filterSpeciesClause=${filterSpeciesClause}`,
      null,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("POST request error: Unable to get encounter", err);
    })
}

export const getAllEncountersForLocation = (generationId, locationId, gameId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(
      `${API_BASE_URL}/encounters/${generationId}/${locationId}?gameId=${gameId}`,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("GET request error: Unable to get all encounters for location", err);
    })
}

export const getGenerationInfo = (generationId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(
      `${API_BASE_URL}/generations/${generationId}`,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("GET request error: Unable to get generation info", err);
    })
}

export const getEncounterModesForLocation = (generationId, locationId) => {
  var headers = getAuthorizationHeader();

  return axios
    .get(
      `${API_BASE_URL}/encounters/${generationId}/${locationId}/modes/all`,
      { headers }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("GET request error: Unable to get generation info", err);
    })
}

export const updateEncounter = (gameId, participantId, locationId, nickname, abilityIndex, nature, gender, isShiny) => {
  var url = `${API_BASE_URL}/games/squadlocke/${gameId}/encounter/update?participantId=${participantId}&locationId=${locationId}&nickname=${nickname}&abilityIndex=${abilityIndex}&nature=${nature}&gender=${gender}&isShiny=${isShiny}`;

  var headers = getAuthorizationHeader();

  return axios
    .post(
      url,
      null,
      { headers }
    )
    .then((response) => {
      console.log(response)
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

}

function sendRequest(url, method, data = null) {
  var headers = getAuthorizationHeader();

  var request = {
    method: method,
    url: url,
    headers: headers
  }

  if(data) {
    request.data = data;
  }

  console.log(request)

  return axios(request)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  });
}
