import styled from "styled-components";
import PropTypes from "prop-types";

import { capitalize } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { MainCard } from "../../components/molecules/mainCard";
import { useLetoUser } from "../../hooks/useLetoUser";
import { UserInfo } from "./UserInfo";
import { getFormattedDate } from "../../libs/utils/date.helpers";
import { UserTierChip } from "./UserTierChip";
import Pricing from "../../components/molecules/pricing/Pricing";
import { useState } from "react";
import { useQuery } from "react-query";
import { getSubscription } from "../../api/subscriptions.api";
import { USER_TIER } from "../../libs/constants/global";
import { useCallback } from "react";
import { BusinessPlanInfo } from "./BusinessPlanInfo";
import { ProPlanInfo } from "./ProPlanInfo";
import { FreePlanInfo } from "./FreePlanInfo";

export const CustomTextField = styled(TextField)`
  label {
    line-height: 0.95em;
  }
`;

export const Form = styled.form`
  width: 100%;
`;

const useSubscription = () => {
  const query = useQuery(["subscription"], async () => {
    return getSubscription().then((res) => res.data);
  });
  return query;
};

function SubscriptionDetails({ user }) {
  const { data: subscription, isLoading } = useSubscription();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const showPricingModal = useCallback(() => {
    setShowSubscriptionModal(true);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body1" component="div">
        Tier: <UserTierChip tier={user.tier} />
      </Typography>
      {user.tier !== USER_TIER.FREE && subscription && (
        <>
          <Typography variant="body1" component="div">
            {/* Label */}
            {subscription?.scheduledForCancelation && "Active until"}
            {!subscription?.scheduledForCancelation &&
              "Next billing date"}: {/* Date */}
            {subscription?.nextBillingDate &&
              getFormattedDate(subscription?.nextBillingDate)}
            {!subscription?.nextBillingDate && "N/A"}
          </Typography>
          <Typography variant="body1" component="div">
            Subscription status: {capitalize(subscription?.status ?? "Active")}
          </Typography>
        </>
      )}
      <Divider />
      {/* Upgrade subscription option */}
      {user.tier === USER_TIER.FREE && (
        <FreePlanInfo showPricingModal={showPricingModal} />
      )}
      {user.tier === USER_TIER.PRO && (
        <ProPlanInfo showPricingModal={showPricingModal} />
      )}
      {user.tier === USER_TIER.BUSINESS && (
        <BusinessPlanInfo showPricingModal={showPricingModal} />
      )}
      {/* Subscription Modal */}
      <Dialog
        open={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4">Subscription Plans</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2} padding={2}>
            <DialogContentText>
              Choose a plan that works best for you.
            </DialogContentText>
            <Pricing user={user} />
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setShowSubscriptionModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

SubscriptionDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export function AccountDetails() {
  const { user, isLoading, error } = useLetoUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const message =
      error?.message ??
      "Unable to load user details at this time, please try again later.";
    return <Alert severity="error">{message}</Alert>;
  }

  return (
    <Stack spacing={2} justifyContent="space-between" direction="row">
      <MainCard title="User info" sx={{ width: "50%" }}>
        <UserInfo user={user} />
      </MainCard>
      <MainCard title="Leto Plan" sx={{ width: "50%" }}>
        <SubscriptionDetails user={user} />
      </MainCard>
    </Stack>
  );
}
