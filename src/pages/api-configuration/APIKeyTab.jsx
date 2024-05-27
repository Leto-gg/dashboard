import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PlusOutlined from "@ant-design/icons/PlusOutlined";

import { useTheme } from "@mui/material";

import LockFilled from "@ant-design/icons/LockFilled";

import { MainCard } from "../../components/molecules/mainCard";
import { useState } from "react";
import { CreateSecretKeyModal } from "./CreateSecretKeyModal";

function CreateAPIKey() {
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      padding={theme.spacing(2)}
      sx={{
        border: 1,
        borderStyle: "dashed",
        borderColor: theme.palette.primary.light,
        borderRadius: 2,
      }}
    >
      <CreateSecretKeyModal
        open={showSecretKeyModal}
        onClose={() => setShowSecretKeyModal(false)}
      />
      <Box
        sx={{
          // 1 unit = 8px
          borderRadius: 3,
          padding: theme.spacing(0.25, 1.25, 0.25, 1.25),
          color: theme.palette.grey[600],
          fontSize: "1.5rem",
          fontWeight: "bold",
          border: 1,
          borderColor: theme.palette.primary.dark,
        }}
      >
        <LockFilled />
      </Box>
      <Typography variant="subtitle1">
        You currently have no API key created. Create an API key access Leto
        APIs
      </Typography>
      <Button
        variant="contained"
        startIcon={<PlusOutlined />}
        onClick={() => setShowSecretKeyModal(true)}
      >
        Create new secret key
      </Button>
    </Box>
  );
}

export function APIKeyTab() {
  return (
    <MainCard title="API key configuration">
      <Stack spacing={3}>
        <Typography variant="body1">
          Do not share your API key with others, or expose it in the browser or
          other client-side code. In order to protect the security of your
          account, Leto may also automatically disable any API key that has
          leaked publicly.
        </Typography>
        <CreateAPIKey />
      </Stack>
    </MainCard>
  );
}
