import axios from "axios";

const isTokenExpired = (expiry) => {
  if (!expiry) return true;
  return parseInt(expiry) < Date.now();
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const refreshTokenExpiry = localStorage.getItem("refresh_token_expiry");

    if (!refreshToken || isTokenExpired(refreshTokenExpiry)) {
      throw new Error("Refresh token expired");
    }

    const response = await axios.post(
      "http://localhost:8000/api/auth/refresh-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { access_token, access_token_expiration } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem(
      "access_token_expiry",
      Date.now() + access_token_expiration * 1000
    );

    return access_token;
  } catch (error) {
    throw error;
  }
};

const checkAndRefreshToken = async (redirectToLogin) => {
  try {
    const accessTokenExpiry = localStorage.getItem("access_token_expiry");
    const refreshTokenExpiry = localStorage.getItem("refresh_token_expiry");

    if (!accessTokenExpiry || !refreshTokenExpiry) {
      localStorage.clear();
      if (redirectToLogin) redirectToLogin();
      return null;
    }

    if (isTokenExpired(accessTokenExpiry)) {
      const newAccessToken = await refreshToken();
      return newAccessToken;
    }

    return localStorage.getItem("access_token");
  } catch (error) {
    localStorage.clear();
    if (redirectToLogin) redirectToLogin();
    return null;
  }
};

export { checkAndRefreshToken, isTokenExpired };
