import { useCallback, useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SaveOutlined } from "@ant-design/icons";

import { FETCHING_STATES, useFetch } from "../../hooks/useFetch";
import { MainCard } from "../../components/molecules/mainCard";
import { getAnalytics } from "../../api/analytics.api";
import { CIDTable } from "../../components/organisms/cidTable";

function CIDForm() {
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

export default function CIDs() {
  const [{ data, type }, handleFetch] = useFetch();

  useEffect(() => {
    // replace with paginated cids api
    handleFetch(() => getAnalytics([]));
  }, [handleFetch]);

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <MainCard title="Add CID to track">
        <CIDForm />
      </MainCard>
      <MainCard title="List of CIDs you are tracking">
        <CIDTable
          cidAnalytics={data?.data}
          isLoading={type === FETCHING_STATES.PENDING}
          onRemove={(content) => console.log("cid to remove:", content)}
        />
      </MainCard>
    </Box>
  );
}
