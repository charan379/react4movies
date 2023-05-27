const Roles = Object.freeze({
    ADMIN: "Admin",
    MODERATOR: "Moderator",
    USER: "User",
    GUEST: "Guest",
});

export const LevelZero = [...Object.values(Roles)];

export const LevelOne = [Roles.ADMIN, Roles.MODERATOR, Roles.USER];

export const LevelTwo = [Roles.ADMIN, Roles.MODERATOR];

export const LevelThere = [Roles.ADMIN];

export default Roles;
