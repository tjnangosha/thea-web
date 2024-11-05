import React from "react";
import type { ResponseSubject, ResponseSubjectTest } from "../../../interfaces";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { List, Typography, Space, theme, Card, Table, Empty } from "antd";
import dayjs from "dayjs";
import { UserStatus } from "../userStatus";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import { useTable } from "@refinedev/antd";

type Props = {
  subject: ResponseSubject;
  tests: ResponseSubjectTest[];
};

const CustomEmpty = () => (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No tests" />
);

export const SubjectInfoList = ({ subject, tests }: Props) => {
  const { token } = theme.useToken();
  const t = useTranslate();
 
  return (
    <>
      <Card
        bordered={false}
        styles={{
          body: {
            padding: "0 16px 0 16px",
          },
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Email",
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              icon: <MailOutlined />,
              value: <Typography.Text>{subject?.email}</Typography.Text>,
            },
            {
              title: "Date registered",
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              icon: <CalendarOutlined />,
              value: (
                <Typography.Text>
                  {dayjs(subject?.created_at).format("MMMM, YYYY HH:mm A")}
                </Typography.Text>
              ),
            },
          ]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={
                    <Typography.Text type="secondary">
                      {item.title}
                    </Typography.Text>
                  }
                  description={item.value}
                />
              </List.Item>
            );
          }}
        />
      </Card>
      <List header={<Typography.Title level={5}>Tests</Typography.Title>}>
        <Table
          rowKey="id"
          scroll={{ x: true }}
          locale={{
            emptyText: <CustomEmpty />,
          }}
          dataSource={tests}
        >
          <Table.Column dataIndex="test_id" title="ID" />
          <Table.Column dataIndex="disease" title="Disease" />
          <Table.Column dataIndex="test_result" title="Result" />
          <Table.Column dataIndex="test_center" title="Test center" />
          <Table.Column dataIndex="test_date" title="Test date" />
        </Table>
      </List>
    </>
  );
};
