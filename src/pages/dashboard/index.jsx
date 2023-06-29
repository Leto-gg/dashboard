import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { MainCard } from "./../../components/molecules/mainCard";
import { useState } from "react";
import { LineChart } from "../../components/molecules/lineChart";

function DashboardChart() {
  const [slot, setSlot] = useState("week");
  return (
    <Grid item xs={12} md={7} lg={8}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">CID views</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot("month")}
              color={slot === "month" ? "primary" : "secondary"}
              variant={slot === "month" ? "outlined" : "text"}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot("week")}
              color={slot === "week" ? "primary" : "secondary"}
              variant={slot === "week" ? "outlined" : "text"}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <LineChart slot={slot} />
        </Box>
      </MainCard>
    </Grid>
  );
}

export default function Dashboard() {
  return (
    <>
      <h3>Welcome, John Doe!</h3>
      <DashboardChart />
    </>
  );
}
