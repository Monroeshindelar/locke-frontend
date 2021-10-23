export const ACCESS_TOKEN_NAME = "access_token";
export const API_BASE_URL = `http://${process.env['REACT_APP_API_BASE_URL_HOST']}:${process.env['REACT_APP_API_BASE_URL_PORT']}`;

export const OAUTH2_REDIRECT_URL = `http://${process.env['REACT_APP_API_BASE_URL_HOST']}:3000/oauth2/redirect`;
export const DISCORD_AVATAR_BASE_URL = "https://cdn.discordapp.com/avatars/";
export const DISCORD_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/discord?redirect_uri=${OAUTH2_REDIRECT_URL}`;

export const ACCOUNT_DETAIL_VIEW_PATH = "/accounts/me";
export const GAME_DETAIL_VIEW_PATH = "/game";
export const GAME_CREATION_CONFIGURATION_PATH = "/game/create";
export const GAME_PARTICIPANT_DETAIL_VIEW_PATH = "/game/participant";
