import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import { DeleteOutlined } from "@ant-design/icons";

import useDeleteProxyGateway from "../../../hooks/useDeleteProxyGateway";

function DeleteProxyGatewayButton({ gatewayId }) {
  const deleteMutation = useDeleteProxyGateway(gatewayId);

  const handleProxyGatewayDelete = () => {
    if (window.confirm("Are you sure you want to delete your proxy gateway?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <LoadingButton
        title="delete proxy gateway"
        loading={deleteMutation.isLoading}
        disabled={!gatewayId}
        aria-label="delete proxy gateway"
        color="error"
        startIcon={<DeleteOutlined />}
        variant="contained"
        onClick={handleProxyGatewayDelete}
      >
        Delete
      </LoadingButton>
    </Box>
  );
}

DeleteProxyGatewayButton.propTypes = {
  gatewayId: PropTypes.string.isRequired,
};

export default DeleteProxyGatewayButton;
