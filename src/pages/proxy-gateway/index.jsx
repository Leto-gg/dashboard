import { useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import styled from "styled-components";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/lab/Alert";

import { CopyOutlined } from "@ant-design/icons";

import { MainCard } from "../../components/molecules/mainCard";
import useProxyGateway from "../../hooks/useProxyGateway";
import useUpdateProxyGateway from "../../hooks/useUpdateProxyGateway";
import { validateGatewayName } from "../../libs/utils/gateway.helpers";
import DeleteProxyGatewayButton from "../../components/atoms/deleteProxyGatewayButton";

const CustomInput = styled(OutlinedInput)`
  input {
    padding-left: 0 !important;
  }
  width: 325px;
`;

function ProxyGatewayField({ proxyURL, previousProxyName, gatewayId }) {
  const updateMutation = useUpdateProxyGateway();

  const [proxyName, setProxyName] = useState(() => previousProxyName);

  const isUpdateDisabled =
    proxyName === "" ||
    previousProxyName === proxyName ||
    !validateGatewayName(proxyName);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Alert severity="info">
        Gateway name should be lowercase alphanumeric characters or
        &apos;-&apos;, and must start and end with an alphanumeric character
      </Alert>
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl variant="outlined">
          <CustomInput
            id="proxy-name"
            placeholder="proxy-name"
            type="text"
            value={proxyName}
            onChange={(e) => setProxyName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                {proxyURL.origin + "/"}
              </InputAdornment>
            }
            endAdornment={
              // clipboard copy button
              <InputAdornment position="end">
                <IconButton
                  title="copy proxy url"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(proxyURL.href);
                  }}
                >
                  <CopyOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <LoadingButton
          loading={updateMutation.isLoading}
          disabled={isUpdateDisabled}
          style={{ width: 80 }}
          variant="contained"
          onClick={() => {
            if (
              window.confirm(
                "Updating proxy name will not redirect older requests to the new name. Are you sure you want to continue?"
              )
            ) {
              updateMutation.mutate({ proxyName, id: gatewayId });
            }
          }}
        >
          <Typography>Save</Typography>
        </LoadingButton>
      </Box>
      {updateMutation.isError && (
        <Alert severity="error">
          {updateMutation.error?.response?.data?.message ??
            "Something went wrong while trying to update proxy name."}
        </Alert>
      )}
    </Box>
  );
}

ProxyGatewayField.propTypes = {
  proxyURL: PropTypes.instanceOf(URL).isRequired,
  gatewayId: PropTypes.string.isRequired,
  previousProxyName: PropTypes.string.isRequired,
};

function ProxyGateway() {
  const proxyGatewayQuery = useProxyGateway();

  // show loading indicator while fetching data
  if (proxyGatewayQuery.isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (proxyGatewayQuery.isError) {
    return (
      <Alert severity="error">
        Something went wrong while trying to fetch gateway details. Please try
        again later.
      </Alert>
    );
  }

  // if proxy gateway is not created, redirect to create page
  if (!proxyGatewayQuery.data?.proxyURL) {
    return <Navigate to="/proxy-gateway/create" />;
  }

  const proxyURL = new URL(proxyGatewayQuery.data.proxyURL);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" justifyContent="flex-end">
        <DeleteProxyGatewayButton gatewayId={proxyGatewayQuery.data?._id} />
      </Box>
      <MainCard title="Your Proxy Gateway" classname="d-flex">
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>You can edit your proxy name here: </Typography>
            <ProxyGatewayField
              gatewayId={proxyGatewayQuery.data._id}
              proxyURL={proxyURL}
              previousProxyName={proxyGatewayQuery.data.proxyName}
            />
          </Box>
          <Divider />
          <section>
            <Typography>
              Example usage for your gateway url:{" "}
              <Link
                href={`${proxyURL.href}/ipfs/bafybeicrjwhn6nifl7tcuhkcitquvpumj426qa7r7ppcya5skmqly5n2la`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${proxyURL.href}/ipfs/bafybeicrjwhn6nifl7tcuhkcitquvpumj426qa7r7ppcya5skmqly5n2la`}
              </Link>
            </Typography>
          </section>
        </Box>
      </MainCard>
    </Box>
  );
}

export default ProxyGateway;
