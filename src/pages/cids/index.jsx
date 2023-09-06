import { Box } from "@mui/material";

import { MainCard } from "../../components/molecules/mainCard";
import { CIDTable } from "../../components/organisms/cidTable";
import { CIDForm } from "../../components/molecules/cidForm";
import useCIDs from "../../hooks/useCIDs";
import { useCallback } from "react";

// TODO: Add alert for errors
function CIDs() {
  const {
    query,
    createMutation,
    deleteMutation,
    handlePageChange,
    handleSizeChange,
  } = useCIDs();

  const { data, isLoading: isQueryLoading } = query;

  const { mutate: deleteCID, isLoading: isDeleteMutationLoading } =
    deleteMutation;

  const { isLoading: isCreateMutationLoading } = createMutation;

  const handleRemove = useCallback(
    (content) => {
      if (
        content.cid &&
        window.confirm("Are you sure you want to delete this CID?")
      ) {
        deleteCID(content.cid);
      }
    },
    [deleteCID]
  );

  const isLoading =
    isCreateMutationLoading || isDeleteMutationLoading || isQueryLoading;

  const { data: cids, metadata } = data?.data ?? {};

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <MainCard title="Add CID to track">
        <CIDForm isLoading={isLoading} createCID={createMutation.mutateAsync} />
      </MainCard>
      <MainCard title="List of CIDs you are tracking">
        <CIDTable
          cidAnalytics={cids}
          pagination={{
            total: metadata?.total,
            page: metadata?.page,
          }}
          onPageChange={handlePageChange}
          onSizeChange={handleSizeChange}
          isLoading={isLoading}
          onRemove={handleRemove}
        />
      </MainCard>
    </Box>
  );
}

export default CIDs;
