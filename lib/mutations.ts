import fetcher from "./fetcher";

export const loginMutation = (
  mode: string,
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const registerMutation = (
  mode: string,
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
