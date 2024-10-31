import { Row, Col, theme, Dropdown, type MenuProps, Button, Flex } from "antd";
import { useTranslation } from "react-i18next";

import { CardWithMetrics } from "../../components";
import { useMemo, useState } from "react";
import { List, NumberField } from "@refinedev/antd";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import type { ISalesChart, ResponseOverview } from "../../interfaces";
import iconDrivers from "../../icons/icon_drivers.svg";
import iconTests from "../../icons/icon_tests.svg";
import iconDiseases from "../../icons/icon_diseases.svg";
import iconUsers from "../../icons/icon_users.svg";

export const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const API_URL = useApiUrl();

  const { data } = useCustom<ResponseOverview[]>({
    url: `${API_URL}/api/overview`,
    method: "get",
  });

  return (
    <Row gutter={16} justify={"center"}>
      <Col xs={24} sm={12} md={6}>
        <CardWithMetrics icon={iconDrivers} metric="Drivers" value={data?.data[0].num_subjects} />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <CardWithMetrics icon={iconTests} metric="Tests" value={data?.data[0].num_tests} />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <CardWithMetrics
          icon={iconDiseases}
          metric="Diseases"
          value="COVID-19"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <CardWithMetrics icon={iconUsers} metric="Users" value={data?.data[0].num_users} />
      </Col>
    </Row>
  );
};
