import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

import useCreateProxyGateway from "../../hooks/useCreateProxyGateway";
import useProxyGateway from "../../hooks/useProxyGateway";
import { MainCard } from "../../components/molecules/mainCard";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAxiosResponseErrorMessage } from "../../libs/utils/api.helpers";

const CustomTextField = styled(TextField)`
  label {
    line-height: 0.95em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

// const validGatewayPattern = /^((https|http):\/\/)?([a-z0-9-]+\.)?[a-z0-9-]+.link(\/)?$/i;

// function isValidGateway(gateway) {
//   if (gateway instanceof URL) gateway = gateway.href;
//   if (!gateway.startsWith("http")) gateway = `https://${gateway}`;
//   return validGatewayPattern.test(gateway);
// }

function getFormErrors(formData) {
  const errors = {};

  if (!formData.proxyName) {
    errors.proxyName = "Proxy name is required";
  }

  // if (!validateGatewayName(formData.proxyName)) {
  //   errors.proxyName =
  //     "Proxy name must be lowercase alphanumeric characters or '-', and must start and end with an alphanumeric character";
  // }

  if (!formData.gatewayURL) {
    errors.gatewayURL = "Gateway URL is required";
  }

  // if (!isValidGateway(formData.gatewayURL)) {
  //   errors.gatewayURL = "Gateway URL is invalid";
  // }

  return errors;
}

function CreateProxyGatewayForm({ onCreate, isCreating = false, apiError }) {
  const [formData, setFormData] = useState({
    proxyName: "",
    gatewayURL: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      setErrors({});

      const errors = getFormErrors(formData);

      if (Object.keys(errors).length === 0) {
        onCreate(formData);
      } else {
        setErrors(errors);
      }
    },
    [formData, onCreate]
  );

  return (
    <Form aria-label="proxy gateway form" onSubmit={handleSubmit}>
      <Alert severity="info">
        Gateway name should be lowercase alphanumeric characters or
        &apos;-&apos;, and must start and end with an alphanumeric character
        <br />
        Gateway URL should be ipfs link-able e.g. https://sphn.link,
        https://w3s.link
      </Alert>

      <CustomTextField
        aria-label="proxy name"
        onChange={handleChange}
        placeholder="Enter proxy name"
        name="proxyName"
        label="Proxy name"
      />
      <CustomTextField
        aria-label="gateway url"
        placeholder="Enter gateway url e.g. https://sphn.link"
        onChange={handleChange}
        name="gatewayURL"
        label="Gateway URL"
      />

      {Object.keys(errors).map((errorKey) => (
        <Alert key={errorKey} severity="error">
          {errors[errorKey]}
        </Alert>
      ))}

      {apiError && (
        <Alert severity="error">{apiError || "Something went wrong"}</Alert>
      )}

      <div>
        <LoadingButton
          loading={isCreating}
          variant="contained"
          style={{ width: 80 }}
          type="submit"
        >
          {isCreating ? "Creating..." : "Create"}
        </LoadingButton>
      </div>
    </Form>
  );
}

CreateProxyGatewayForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  apiError: PropTypes.string,
};

function CreateProxyGateway() {
  const navigate = useNavigate();

  const proxyGateway = useProxyGateway();
  const proxyGatewayMutation = useCreateProxyGateway();

  const { mutateAsync: createProxyGateway } = proxyGatewayMutation;

  const handleCreate = useCallback(
    async (formData) =>
      createProxyGateway(formData)
        .then(() => {
          navigate("/proxy-gateway", { replace: true });
        })
        .catch((error) => {
          console.error("error creating proxy gateway", error);
        }),
    [createProxyGateway, navigate]
  );

  if (proxyGateway.isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (proxyGateway.data?.proxyURL) {
    return <Navigate to="/proxy-gateway" />;
  }

  return (
    <main>
      <MainCard title="Create proxy gateway">
        <CreateProxyGatewayForm
          isCreating={proxyGatewayMutation.isLoading}
          onCreate={handleCreate}
          apiError={getAxiosResponseErrorMessage(proxyGatewayMutation.error)}
        />
      </MainCard>
    </main>
  );
}

export default CreateProxyGateway;
