import { useState, useMemo, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";

import { getFormattedDate } from "../../../libs/utils/date.helpers.js";

function getCustomTooltip({ seriesIndex, dataPointIndex, w }) {
  var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

  return `<div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">${
    data.cid
  }</div>
  <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
      <span class="apexcharts-tooltip-marker" style="background-color: rgba(32, 45, 84, 0.85);"></span>
      <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
          <div><span class="apexcharts-tooltip-text-y-label">Numbers Accessed: </span><span class="apexcharts-tooltip-text-y-value">${
            data.numbersAccessed
          }</span></div>
      </div>
  </div>
  <div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 2; display: flex;">
      <span class="apexcharts-tooltip-marker" style="background-color: rgba(32, 45, 84, 0.85);"></span>
      <div class="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
        <div><span class="apexcharts-tooltip-text-y-label">Last Accessed: </span><span class="apexcharts-tooltip-text-y-value">${getFormattedDate(
          data.lastAccessed
        )}</span></div>
      </div>
  </div>
  `;
}

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
    custom: getCustomTooltip,
  },
  yaxis: {
    show: true,
    axisBorder: false,
  },
  grid: {
    show: true,
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
    <ReactApexChart options={options} series={series} type="bar" height={420} />
  );
}

BarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisLabel: PropTypes.string,
};
