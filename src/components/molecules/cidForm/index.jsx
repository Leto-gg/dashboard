import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveOutlined from "@ant-design/icons/SaveOutlined";

export function CIDForm() {
  const [cidValue, setCIDValue] = useState("");

  const handleChange = useCallback((e) => {
    setCIDValue(e.target.value);
  }, []);

  const handleUpdate = useCallback(() => {
    console.log("cid to add:", cidValue);
  }, [cidValue]);

  return (
    <Box alignItems="flex-start" display="flex" gap={2} flexDirection="column">
      <TextField
        label="CID"
        spellCheck={false}
        onKeyUp={handleChange}
        placeholder="Example CID: bafybeiedv7sowwxamly4oicivudp45rsfvbklnf3fvbvonxrwoxqylhtwq"
        fullWidth
      />
      <Button
        onClick={handleUpdate}
        disabled={!cidValue}
        variant="contained"
        color="primary"
        startIcon={<SaveOutlined />}
      >
        Add
      </Button>
    </Box>
  );
}
