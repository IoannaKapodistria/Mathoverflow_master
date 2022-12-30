export type userAvatarInfo = {
    username: string;
    displayName: string;
    admin: boolean;
};
export function isUserAvatarInfo(value: any): value is userAvatarInfo {
    if (!value) return false;
    if (typeof value.username !== "string") return false;
    if (typeof value.displayName !== "string") return false;
    if (typeof value.admin !== "boolean") return false;
    return true;
}

export function defaultUserAvatarInfo(): userAvatarInfo {
    return {
        username: "",
        displayName: "",
        admin: false,
    };
}
