import type { AuthProvider, AuthActionResponse } from "@refinedev/core";
import { notification } from "antd";

export const TOKEN_KEY = "THEA_TOKEN";
export const USER_DETAILS_KEY = "THEA_USER";

export const API_URL = "http://localhost:8000";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await fetch(`${API_URL}/login/user/`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status < 200 || response.status > 299) {
      return {
        success: false,
        redirectTo: "/login",
        error: {
          message: "Login failed",
          name: "Please check your credentials and try again!",
        },
      };
    }

    const data = await response.json();

    localStorage.setItem(TOKEN_KEY, data.access);
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(data.user));

    return {
      success: true,
      redirectTo: '/',
      successNotification: {
        message: "Login was successful!",
      }
    };
  },

  register: async ({ email, password }) => {
    try {
      await authProvider.login({ email, password });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);

    // add a call so that these tokens can be revoked on the server

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },

  check: async () => {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    const token = localStorage.getItem(TOKEN_KEY);

    if (user && token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
      logout: true,
    };
  },

  getPermissions: async () => null,
  
  getIdentity: async () => {
    const access_token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_DETAILS_KEY);

    if (!access_token || !user) {
      return null;
    }

    const {id, email, access, name} = JSON.parse(user);

    return {
      access_token: access,
      id,
      name,
      email
    };
  },
};
