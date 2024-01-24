import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function BusinessPlanInfo({ showPricingModal }) {
  return (
    <>
      <Stack spacing={1} alignItems="flex-start">
        <Typography variant="body1">
          Need a custom plan? Contact us below
        </Typography>
        <Link href="mailto:admin@galaxyx.io">admin@galaxyx.io</Link>
        <Typography variant="body1">
          OR downgrade to the standard plan. You can still use all the features
          until the end of your billing cycle.
        </Typography>
        <Button variant="contained" color="primary" onClick={showPricingModal}>
          Downgrade
        </Button>
      </Stack>
    </>
  );
}

BusinessPlanInfo.propTypes = {
  showPricingModal: PropTypes.func.isRequired,
};
