import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

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
      <IconButton
        title="delete proxy gateway"
        disabled={deleteMutation.isLoading}
        aria-label="delete proxy gateway"
        color="error"
        onClick={handleProxyGatewayDelete}
      >
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
}

DeleteProxyGatewayButton.propTypes = {
  gatewayId: PropTypes.string.isRequired,
};

export default DeleteProxyGatewayButton;
