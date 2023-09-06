import { useMemo } from "react";

import { Alert, Box, CircularProgress, Grid } from "@mui/material";

import { MainCard } from "./../../components/molecules/mainCard";
import { BarChart } from "../../components/molecules/barChart";
import { middleTruncate } from "../../libs/utils/string.helpers";
import { useQuery } from "react-query";
import { getAnalytics } from "../../api/analytics.api";

function useDashboardAnalytics(...params) {
  const query = useQuery("analytics", () => getAnalytics(...params));

  return query;
}

function Graph() {
  const {
    data: analyticsData = {},
    isLoading,
    error,
  } = useDashboardAnalytics();

  const { data } = analyticsData;

  const labels = useMemo(
    () => data?.data?.map((content) => middleTruncate(content.cid, 6)) ?? [],
    [data]
  );
  const dataPoints = useMemo(
    () => data?.data?.map((data) => data.numbersAccessed) ?? [],
    [data]
  );

  if (isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to fetch data for the chart, we are working on fixing it as soon
        as possible!
      </Alert>
    );
  }

  return (
    <BarChart
      xAxisLabel="numbersAccessed"
      labels={labels}
      dataPoints={dataPoints}
    />
  );
}

function CIDAnalytics() {
  return (
    <Grid item>
      <MainCard content={false} sx={{ mt: 1.5 }} title="CID Analytics">
        <Box sx={{ padding: 2 }}>
          <Graph />
        </Box>
      </MainCard>
    </Grid>
  );
}

export default function Dashboard() {
  return (
    <Grid>
      <h3>CID performance over last week</h3>
      <CIDAnalytics />
    </Grid>
  );
}
