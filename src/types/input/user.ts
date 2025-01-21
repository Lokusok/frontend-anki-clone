export type TUserInputRegister = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type TUserInputLogin = {
    email: string;
    password: string;
};
