import { Row, Col, theme, Dropdown, type MenuProps, Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { List, NumberField } from "@refinedev/antd";
import { useApiUrl, useCustom } from "@refinedev/core";
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { CardWithMetrics } from "../../components";
import type {  ResponseOverview, ResponseWeeklyStat } from "../../interfaces";
import iconDrivers from "../../icons/icon_drivers.svg";
import iconTests from "../../icons/icon_tests.svg";
import iconDiseases from "../../icons/icon_diseases.svg";
import iconUsers from "../../icons/icon_users.svg";
import { usePageTitle } from "../../hooks";

type Props = {
  weeklyStats: ResponseWeeklyStat[]
}

const BarChart = (props: Props) => {
  const {weeklyStats} = props

  const data = {
    labels: weeklyStats?.map(stat => stat.date),
    datasets: [
      {
        label: 'Subjects',
        data: weeklyStats?.map(stat => stat.new_subjects),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tests',
        data: weeklyStats?.map(stat => stat.tests_taken),
        backgroundColor: 'rgba(71, 64, 43, 0.2)',
        borderColor: 'rgba(71, 64, 43, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'New subjects and tests over the past week ',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // @ts-ignore
  return <Bar data={data} options={options} />;
};

export const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const API_URL = useApiUrl();

  const { data } = useCustom<ResponseOverview>({
    url: `${API_URL}/api/overview/`,
    method: "get",
  });

  usePageTitle("Overview | Thea");

  return (
    <>
      <Row gutter={16} justify={"center"}>
        <Col xs={24} sm={12} md={6}>
          <Link to="/subjects">
            <CardWithMetrics icon={iconDrivers} metric="Subjects" value={data?.data.num_subjects} />
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="/tests">
            <CardWithMetrics icon={iconTests} metric="Tests" value={data?.data.num_tests} />
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="">
            <CardWithMetrics
              icon={iconDiseases}
              metric="Diseases"
              value="COVID-19" />
          </Link>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Link to="">
            <CardWithMetrics icon={iconUsers} metric="Users" value={data?.data.num_users} />
          </Link>
        </Col>
      </Row>
      {
        // @ts-ignore
        <BarChart weeklyStats={data?.data.weekly_stats} />
      }
    </>
  );
};
