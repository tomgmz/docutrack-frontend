let accessToken: string | null = null;

// allow string or null
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;
