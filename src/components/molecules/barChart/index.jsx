import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";

/**
 * @type {import("react-apexcharts/types/react-apexcharts").Props["options"]}
 */
const barChartOptions = {
  chart: {
    type: "bar",
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  tooltip: {
    theme: "light",
  },
  yaxis: {
    show: true,
    axisBorder: false,
  },
  grid: {
    show: false,
  },
};

/**
 * @typedef Props
 * @property {string} [xAxisLabel]
 * @property {string[]} labels
 * @property {number[]} dataPoints
 */

/**
 *
 * @param {Props} props
 * @returns
 */
export function BarChart({ xAxisLabel, labels, dataPoints }) {
  const theme = useTheme();
  const [options, setOptions] = useState(() => barChartOptions);

  const series = useMemo(
    () => [{ name: xAxisLabel, data: dataPoints }],
    [dataPoints, xAxisLabel]
  );

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.main;

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        ...prevState.xaxis,
        categories: labels,
        labels: {
          style: {
            colors: new Array(labels.length).fill(secondary),
          },
        },
      },
    }));
  }, [primary, info, secondary, labels]);

  return (
    <ReactApexChart options={options} series={series} type="bar" height={365} />
  );
}

BarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisLabel: PropTypes.string,
};
