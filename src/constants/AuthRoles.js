const Roles = Object.freeze({
    ADMIN: "Admin",
    MODERATOR: "Moderator",
    USER: "User"
});

export const LevelOne = [...Object.values(Roles)];

export const LevelTwo = [Roles.ADMIN, Roles.MODERATOR];

export const LevelThere = [Roles.ADMIN];

export default Roles;
