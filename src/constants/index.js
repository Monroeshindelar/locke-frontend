export const ACCESS_TOKEN_NAME = "access_token";
<<<<<<< HEAD
=======
//export const API_BASE_URL = "http://10.0.0.84:9292";
>>>>>>> 0284d514c46bda4e993b6d7ac8f6cc2e0b44932e
export const API_BASE_URL = "http://24.17.77.207:9292";

export const OAUTH2_REDIRECT_URL = "http://localhost:3000/oauth2/redirect";
export const DISCORD_AVATAR_BASE_URL = "https://cdn.discordapp.com/avatars/";
export const DISCORD_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/discord?redirect_uri=${OAUTH2_REDIRECT_URL}`;

export const ACCOUNT_DETAIL_VIEW_PATH = "/accounts/me"
export const GAME_DETAIL_VIEW_PATH = "/game"
export const GAME_CREATION_CONFIGURATION_PATH = "/game/create"
export const GAME_PARTICIPANT_DETAIL_VIEW_PATH = "/game/participant"