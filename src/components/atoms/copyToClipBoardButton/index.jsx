import { useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import CopyOutlined from "@ant-design/icons/CopyOutlined";

const CLIPBOARD_DEFAULT_TIMEOUT_MS = 2000;

export function CopyToClipboardButton({
  value,
  timeout = CLIPBOARD_DEFAULT_TIMEOUT_MS,
  ...props
}) {
  const [buttonLabel, setButtonLabel] = useState("Copy");
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setButtonLabel("Copied!");

    setTimeout(() => {
      setButtonLabel("Copy");
    }, timeout);
  };

  return (
    <Button
      onClick={copyToClipboard}
      startIcon={<CopyOutlined />}
      color="primary"
      variant="contained"
      {...props}
    >
      {buttonLabel}
    </Button>
  );
}

CopyToClipboardButton.propTypes = {
  value: PropTypes.string.isRequired,
  timeout: PropTypes.number,
};
