export type TChangePasswordInput = {
    currentPassword: string;
    newPassword: string;
};

export type TResetPasswordInput = {
    token: string;
    email: string;
    password: string;
};

export type TSendResetLinkInput = {
    email: string;
};
