import { Card, Flex, Space, Typography, Col } from "antd";
import type { PropsWithChildren } from "react";
import { useConfigProvider } from "../../context";
import { UserOutlined } from "@ant-design/icons";
import { NumberField } from "@refinedev/antd";

// @ts-ignore
export const CardWithMetrics = ({icon, metric, value}) => {
  return (
    <Card style={{ textAlign: 'center', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: 20 }}>
          <div style={{ marginBottom: 8 }}>
            <img src={icon} alt="icon" style={{ width: 40, height: 40 }} />
          </div>
          <h2 style={{ margin: 0 }}>{value}</h2>
          <p style={{ margin: 0, color: 'gray' }}>{metric}</p>
    </Card>
  );
};
