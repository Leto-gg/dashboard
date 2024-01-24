import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { useLetoUser } from "../../../hooks/useLetoUser";

export function TierGuard({ children, allowedTiers = [] }) {
  const { user, isLoading } = useLetoUser();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!user || (allowedTiers.length > 0 && !allowedTiers.includes(user.tier))) {
    return <Navigate to="/" />;
  }

  return children;
}

TierGuard.propTypes = {
  children: PropTypes.node.isRequired,
  allowedTiers: PropTypes.arrayOf(PropTypes.string),
};
