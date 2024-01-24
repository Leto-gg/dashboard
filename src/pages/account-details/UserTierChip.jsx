import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import { USER_TIER } from "../../libs/constants/global";

export function UserTierChip({ tier = USER_TIER.FREE }) {
  switch (tier) {
    case USER_TIER.FREE:
      return <Chip color="secondary" label="Free" size="small" />;
    case USER_TIER.PRO:
      return <Chip color="primary" label="Pro" size="small" />;
    case USER_TIER.BUSINESS:
      return <Chip color="success" label="Business" size="small" />;
    default:
      return null;
  }
}
UserTierChip.propTypes = {
  tier: PropTypes.string.isRequired,
};
