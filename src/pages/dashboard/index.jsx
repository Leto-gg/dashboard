import { useMemo } from "react";

import { Alert, Box, CircularProgress, Grid } from "@mui/material";

import { MainCard } from "./../../components/molecules/mainCard";
import { BarChart } from "../../components/molecules/barChart";
import { middleTruncate } from "../../libs/utils/string.helpers";
import { FETCHING_STATES, useFetch } from "../../hooks/useFetch";
import { getAnalytics } from "../../api/analytics.api";
import { useEffect } from "react";

function CIDAnalytics() {
  const [{ data, type }, handleFetch] = useFetch();

  const labels = useMemo(
    () => data?.data?.map((content) => middleTruncate(content.cid, 6)) ?? [],
    [data]
  );
  const dataPoints = useMemo(
    () => data?.data?.map((data) => data.numbersAccessed) ?? [],
    [data]
  );

  useEffect(() => {
    handleFetch(() =>
      getAnalytics(
        // pass in CIDs that user saved, to get their respective analytics
        []
      )
    );
  }, [handleFetch]);

  return (
    <Grid item>
      <MainCard content={false} sx={{ mt: 1.5 }} title="CID Analytics">
        <Box sx={{ padding: 2 }}>
          {type === FETCHING_STATES.DONE && (
            <BarChart
              xAxisLabel="numbersAccessed"
              labels={labels}
              dataPoints={dataPoints}
            />
          )}
          {type === FETCHING_STATES.PENDING && (
            <CircularProgress variant="indeterminate" />
          )}
          {type === FETCHING_STATES.FAIL && (
            <Alert severity="error">
              Failed to fetch data for the chart, we are working on fixing it as
              soon as possible!
            </Alert>
          )}
        </Box>
      </MainCard>
    </Grid>
  );
}

export default function Dashboard() {
  return (
    <Grid>
      <h3>Welcome, John Doe!</h3>
      <CIDAnalytics />
    </Grid>
  );
}
