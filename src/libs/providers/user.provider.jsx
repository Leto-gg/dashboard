import { createContext } from "react";
import PropTypes from "prop-types";

import { useUser } from "../../hooks/useUser";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { data: user, isLoading, error } = useUser();

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
