import { useMutation } from "react-query";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { CheckOutlined, StarOutlined } from "@ant-design/icons";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {
  cancelSubscription,
  createCheckoutSession,
} from "../../../api/subscriptions.api";
import { USER_TIER } from "../../../libs/constants/global";

const tiers = [
  {
    id: USER_TIER.FREE,
    title: "Free",
    price: "0",
    description: ["Open Metrics Query", "HTTP Gateway Access"],
    buttonText: "Downgrade plan",
    buttonVariant: "outlined",
    priceLookupKey: null,
    buttonColor: "secondary",
  },
  {
    id: USER_TIER.PRO,
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    priceLookupKey: "pro-plan",
    caption: "Everything in Free, plus:",
    description: [
      "Customized IPFS Gateway",
      "Event Based Notifications",
      "Encrypted Log Streaming",
    ],
    buttonText: "Subscribe",
    buttonVariant: "contained",
    buttonColor: "primary",
  },
  {
    id: USER_TIER.BUSINESS,
    title: "Business",
    price: "50",
    priceLookupKey: "business-plan",
    caption: "Everything in Pro, plus:",
    description: [
      "Malware Detection",
      "Advanced Dashboard",
      "Priority Support",
    ],
    buttonText: "Subscribe",
    buttonVariant: "outlined",
    buttonColor: "primary",
  },
];

const useCreateCheckoutSession = () => {
  const mutation = useMutation(createCheckoutSession);

  return mutation;
};

const useCancelSubscription = () => {
  const mutation = useMutation(cancelSubscription);

  return mutation;
};

export default function Pricing({ user }) {
  const { mutateAsync: createCheckoutSession, isLoading } =
    useCreateCheckoutSession();

  const cancelSubscription = useCancelSubscription();

  const currentTier = user?.tier || USER_TIER.FREE;

  const handleSubscription = (priceLookupKey) => async () => {
    if (priceLookupKey == null) {
      return cancelSubscription.mutateAsync().then(() => {
        const alertMessage = `Your ${currentTier} plan has been cancelled. You can still use ${currentTier} plan features until the end of the billing cycle.`;
        alert(alertMessage);
        location.reload();
      });
    }
    try {
      const response = await createCheckoutSession({
        priceLookupKey,
        email: user.email,
        name: user.name,
      });
      // redirect to checkout page
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Container maxWidth="md" component="main">
      {isLoading && (
        <LinearProgress
          sx={{
            position: "absolute",
            width: "100%",
            left: 0,
            top: 60,
            borderRadius: 0,
          }}
        />
      )}
      <Grid container spacing={5} alignItems="flex-start">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={tier.title === "Pro" ? <StarOutlined /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                {tier.caption && (
                  <Typography variant="subtitle2" align="center">
                    {tier.caption}
                  </Typography>
                )}
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      <CheckOutlined style={{ color: "#059652" }} /> {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              {/* TODO: Currently, upgrade is not supported due to additional scope */}
              {(currentTier === USER_TIER.FREE || tier.id === USER_TIER.FREE) &&
                tier.buttonText &&
                tier.id !== currentTier && (
                  <CardActions>
                    <Button
                      fullWidth
                      disabled={isLoading}
                      color={tier.buttonColor}
                      variant={tier.buttonVariant}
                      onClick={handleSubscription(tier.priceLookupKey)}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                )}
              {/* Show button for upgrade */}
              {currentTier === USER_TIER.PRO &&
                tier.id === USER_TIER.BUSINESS && (
                  <CardActions>
                    <Button
                      fullWidth
                      disabled
                      color={tier.buttonColor}
                      variant={tier.buttonVariant}
                      onClick={handleSubscription(tier.priceLookupKey)}
                    >
                      Upgrade coming soon
                    </Button>
                  </CardActions>
                )}
              {/* Current plan button */}
              {tier.id === currentTier && (
                <CardActions>
                  <Button fullWidth variant="outlined" disabled>
                    Current Plan
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

Pricing.propTypes = {
  user: PropTypes.object,
};
