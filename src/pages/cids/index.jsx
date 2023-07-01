/* eslint-disable react/prop-types */
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { MainCard } from "../../components/molecules/mainCard";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FETCHING_STATES, useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import { getAnalytics } from "../../api/analytics.api";
import { getFormattedDate } from "../../libs/utils/date.helpers";
import { useCallback } from "react";

function getCidTypeChipColor(cidType) {
  switch (cidType) {
    case "ipfs":
      return "success";
    case "ipns":
      return "error";
    default:
      return "primary";
  }
}

/**
 * @param {{ cids: any[], isLoading: boolean, onRemove: function }} props
 * @returns
 */
function CIDTable({ cidAnalytics = [], isLoading = false, onRemove }) {
  if (isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (cidAnalytics.length === 0) {
    return (
      <Typography variant="body1">No CIDs are being tracked by you</Typography>
    );
  }

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>CID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Last Accessed</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cidAnalytics.map((content) => (
            <TableRow key={content.cid}>
              <TableCell>{content.cid}</TableCell>
              <TableCell>
                <Chip
                  aria-label="cid type"
                  color={getCidTypeChipColor(content.cidType)}
                  label={content.cidType.toUpperCase()}
                  variant="filled"
                />
              </TableCell>
              <TableCell>{getFormattedDate(content.lastAccessed)}</TableCell>
              <TableCell>
                <IconButton onClick={() => onRemove(content)}>
                  <DeleteOutlined />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
