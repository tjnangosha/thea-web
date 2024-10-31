import React from "react";
import type { IUser, ResponseSubject } from "../../../interfaces";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  MailOutlined
} from "@ant-design/icons";
import { List, Typography, Space, theme, Card, Table, Empty } from "antd";
import dayjs from "dayjs";
import { UserStatus } from "../userStatus";
import { useTable, useTranslate } from "@refinedev/core";

type Props = {
  subject?: ResponseSubject;
};

const CustomEmpty = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="No tests"
  />
);

export const SubjectInfoList = ({ subject }: Props) => {
  const { token } = theme.useToken();
  const t = useTranslate();

  const { tableProps, filters, sorters } = useTable<ResponseSubject>({
    syncWithLocation: true,
  });

  return (
    <><Card
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
                title={<Typography.Text type="secondary">
                  {item.title}
                </Typography.Text>}
                description={item.value} />
            </List.Item>
          );
        } } />
    </Card>
    <List>
    <Table
        {...tableProps}
        rowKey="id"
        scroll={{ x: true }}
        locale={{
          emptyText: <CustomEmpty />
        }}
      >
        <Table.Column
          key="createdAt"
          dataIndex="created_at"
          title="ID"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column
          key="createdAt"
          dataIndex="created_at"
          title="Disease"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column
          key="createdAt"
          dataIndex="created_at"
          title="Status"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column
          key="createdAt"
          dataIndex="created_at"
          title="Test center"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        
      </Table>
    </List></>
  );
};
