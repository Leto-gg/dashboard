import { useContext } from "react";
import { UserContext } from "../libs/providers/user.provider.jsx";

/**
 * @typedef {Object} LetoUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} email_verified
 * @property {string} tier
 */

/**
 * @returns {{ user: LetoUser, isLoading: boolean, error?: string } }}
 */

export const useLetoUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
