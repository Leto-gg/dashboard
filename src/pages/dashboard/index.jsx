import { useMemo } from "react";
import PropTypes from "prop-types";

import { Alert, Box, CircularProgress, Grid } from "@mui/material";

import { MainCard } from "./../../components/molecules/mainCard";
import { BarChart } from "../../components/molecules/barChart";
import { middleTruncate } from "../../libs/utils/string.helpers";
import { useQuery } from "react-query";
import { getAnalytics } from "../../api/analytics.api";
import useProxyGateway from "../../hooks/useProxyGateway";
import { useEffect } from "react";
import { da } from "date-fns/locale";
import { QUERY_KEY } from "../../libs/constants/query";

const DEFAULT_RANGE = {
  // 7 days ago
  from: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
  // today
  to: new Date().toISOString(),
};

function useDashboardAnalytics(params = {}) {
  const query = useQuery([QUERY_KEY.DASHBOARD_ANALYTICS, params], () =>
    getAnalytics({ ...DEFAULT_RANGE, ...params }).then((res) => res.data)
  );

  return query;
}

function Graph({ analyticsData }) {
  const { data } = analyticsData;

  const labels = useMemo(
    () => data?.map((content) => middleTruncate(content.cid, 6)) ?? [],
    [data]
  );
  const dataPoints = useMemo(
    () =>
      data?.map((data) => {
        data.y = data.numbersAccessed;
        data.x = data.cid;
        return data;
      }) ?? [],
    [data]
  );

  return (
    <BarChart
      xAxisLabel="numbersAccessed"
      labels={labels}
      dataPoints={dataPoints}
    />
  );
}

Graph.propTypes = {
  analyticsData: PropTypes.object.isRequired,
};

function CIDAnalytics() {
  const proxyGateway = useProxyGateway();

  const {
    data: analyticsData = {},
    isLoading,
    isRefetching,
    error,
  } = useDashboardAnalytics({
    gateway: proxyGateway.data?._id,
  });

  if (isLoading || isRefetching || proxyGateway.isLoading) {
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

  if (analyticsData?.data.length === 0) {
    return (
      <Alert severity="info">
        No analytics data found for the tracked CIDs. Make sure you are tracking
        at least one CID on your account.
      </Alert>
    );
  }

  return (
    <Grid item>
      <MainCard content={false} sx={{ mt: 1.5 }} title="CID Analytics">
        <Box sx={{ padding: 2 }}>
          <Graph analyticsData={analyticsData} />
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
