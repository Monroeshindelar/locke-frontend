import { DISCORD_AVATAR_BASE_URL } from "../constants";

export const getAvatarUrl = (user) => {
    return `${DISCORD_AVATAR_BASE_URL}/${user.principalId.toString()}/${user.avatar.toString()}.png`;
}

export const getUsernameWithDiscriminator = (user) => {
    return `${user.username}#${user.discriminator}`;
}