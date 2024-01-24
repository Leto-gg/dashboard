import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function FreePlanInfo({ showPricingModal }) {
  return (
    <Stack spacing={1} alignItems="flex-start">
      <Typography variant="body1">
        Want to get more out of Leto? Check out our plans.
      </Typography>
      <Button variant="contained" color="primary" onClick={showPricingModal}>
        Choose a plan
      </Button>
    </Stack>
  );
}

FreePlanInfo.propTypes = {
  showPricingModal: PropTypes.func.isRequired,
};
