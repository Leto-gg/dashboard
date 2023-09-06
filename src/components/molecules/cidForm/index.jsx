import { useState, useCallback } from "react";
import { PropTypes } from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveOutlined from "@ant-design/icons/SaveOutlined";
import { styled } from "styled-components";

const CustomTextField = styled(TextField)`
  label {
    line-height: 0.95em;
  }
`;

export function CIDForm({ createCID, isLoading = false }) {
  const [cidValue, setCIDValue] = useState("");

  const handleChange = useCallback((e) => {
    setCIDValue(e.target.value);
  }, []);

  const handleCreate = useCallback(() => {
    createCID(cidValue).then(() => {
      setCIDValue("");
    });
  }, [cidValue, createCID]);

  return (
    <Box alignItems="flex-start" display="flex" gap={2} flexDirection="column">
      <CustomTextField
        label="CID"
        variant="outlined"
        spellCheck={false}
        onChange={handleChange}
        value={cidValue}
        placeholder="e.g. bafybeiedv7sowwxamly..."
        fullWidth
      />
      <Button
        onClick={handleCreate}
        disabled={!cidValue || isLoading}
        variant="contained"
        color="primary"
        startIcon={<SaveOutlined />}
      >
        Add
      </Button>
    </Box>
  );
}

// PropTypes for CIDForm
CIDForm.propTypes = {
  createCID: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
