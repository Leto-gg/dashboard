import { useEffect } from "react";

import { Box } from "@mui/material";

import { FETCHING_STATES, useFetch } from "../../hooks/useFetch";
import { MainCard } from "../../components/molecules/mainCard";
import { getAnalytics } from "../../api/analytics.api";
import { CIDTable } from "../../components/organisms/cidTable";
import { CIDForm } from "../../components/molecules/cidForm";

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
