import { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";

import { MainCard } from "../../components/molecules/mainCard";
import { useCreateSecretKey } from "../../hooks/useCreateSecretKey";
import { CopyToClipboardButton } from "../../components/atoms/copyToClipBoardButton";

const contentStyle = {
  position: "absolute",
  top: "50%",
  width: "32rem",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export function CreateSecretKeyModal({ open, onClose }) {
  const { data, mutateAsync: createKey, isLoading } = useCreateSecretKey();

  useEffect(() => {
    if (open) {
      const abortController = new AbortController();
      createKey({}, { signal: abortController.signal });
      return () => {
        abortController.abort();
      };
    }
  }, [createKey, open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={contentStyle}>
        <MainCard
          sx={{
            gap: 2,
          }}
        >
          <Stack gap={4}>
            <Typography variant="h4" id="modal-title">
              Create new secret key
            </Typography>
            {!data && isLoading && (
              <Stack gap={2}>
                <Typography variant="body1">
                  Please wait while we create a new secret key for you.
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  <Skeleton variant="text" height="4rem" width="70%" />
                  <Skeleton variant="rounded" width="25%" height="2.45rem" />
                </Box>
              </Stack>
            )}
            {data && !isLoading && (
              <Stack gap={2}>
                <Typography variant="body1">
                  Please save this secret key somewhere safe and accessible. For
                  security reasons,{" "}
                  <b>you won&apos;t be able to view it again</b> through your
                  Leto account. If you lose this secret key, you&apos;ll need to
                  generate a new one.
                </Typography>
                <Box display="flex" justifyContent="space-between" gap={2}>
                  <TextField
                    value={data.key}
                    fullWidth
                    variant="outlined"
                    aria-readonly="true"
                  />
                  <CopyToClipboardButton
                    value={data.key}
                  />
                </Box>
              </Stack>
            )}
            <Box display="flex" gap={1} justifyContent="flex-end">
              <LoadingButton
                variant="contained"
                color="secondary"
                onClick={onClose}
                loading={isLoading}
              >
                {data && !isLoading && "Done"}
                {!data && isLoading && "Creating..."}
              </LoadingButton>
            </Box>
          </Stack>
        </MainCard>
      </Box>
    </Modal>
  );
}

CreateSecretKeyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
