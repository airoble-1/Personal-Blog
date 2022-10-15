import fetcher from "./fetcher";

export const loginMutation = (
  mode: "login",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const registerMutation = (
  mode: "register",
  body: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    profileImage: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
