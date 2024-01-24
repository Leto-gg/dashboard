import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function ProPlanInfo({ showPricingModal }) {
  return (
    <Stack spacing={1} alignItems="flex-start">
      <Typography variant="body1">
        Growing? Leto scales with your business. Check out our business plan.
      </Typography>
      <Button variant="contained" color="primary" onClick={showPricingModal}>
        Choose a plan
      </Button>
    </Stack>
  );
}

ProPlanInfo.propTypes = {
  showPricingModal: PropTypes.func.isRequired,
};