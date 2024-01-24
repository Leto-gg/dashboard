import { useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { MainCard } from "../../components/molecules/mainCard";

function CheckoutSuccess() {
  return (
    <MainCard title="Checkout success">
      <Stack gap={2}>
        <Typography variant="h4">Thank you for your purchase!</Typography>
        <Typography>
          You will receive an email with your receipt shortly. Redirecting you
          to account details...
        </Typography>
      </Stack>
    </MainCard>
  );
}

function CheckoutCanceled() {
  return (
    <MainCard title="Checkout canceled">
      <Stack gap={2}>
        <Typography>
          Your checkout was canceled. Redirecting you to account details...
        </Typography>
      </Stack>
    </MainCard>
  );
}

const REDIRECTION_TIMEOUT_MS = 5000;

export function CheckoutSession() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/account-details", { replace: true });
    }, REDIRECTION_TIMEOUT_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  if (searchParams.get("success") === "true") {
    return <CheckoutSuccess />;
  }

  if (searchParams.get("canceled") === "true") {
    return <CheckoutCanceled />;
  }

  return <Navigate to="/" />;
}
