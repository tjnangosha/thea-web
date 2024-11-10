import { useNavigation } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space, Flex } from "antd";

import {  } from "../../../components";

import { useStyles } from "./styled";
import { getUniqueListWithCount } from "../../../utils";

export const RecentOrders: React.FC = () => {
  const { token } = theme.useToken();
  const { styles } = useStyles();

  const { tableProps } = useTable({
    resource: "orders",
    initialSorter: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    initialPageSize: 10,
    permanentFilter: [
      {
        field: "status.text",
        operator: "eq",
        value: "Pending",
      },
    ],
    syncWithLocation: false,
  });

  const { show } = useNavigation();

  return (
    <Table
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        hideOnSinglePage: true,
        showSizeChanger: false,
        className: styles.pagination,
      }}
      showHeader={false}
      rowKey="id"
    >
      <Table.Column
        dataIndex="orderNumber"
        className={styles.column}
        render={(_, record) => (
          <Typography.Link
            strong
            onClick={() => show("orders", record.id)}
            style={{
              whiteSpace: "nowrap",
              color: token.colorTextHeading,
            }}
          >
            #{record.orderNumber}
          </Typography.Link>
        )}
      />
      <Table.Column
        dataIndex="id"
        className={styles.column}
        render={(_, record) => {
          return (
            <Space
              size={0}
              direction="vertical"
              style={{
                maxWidth: "220px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: 14,
                }}
              >
                {record?.user?.firstName} {record?.user?.lastName}
              </Typography.Text>
              <Typography.Text
                ellipsis
                style={{
                  fontSize: 12,
                }}
                type="secondary"
              >
                {record?.user?.addresses?.[0]?.text}
              </Typography.Text>
            </Space>
          );
        }}
      />
      <Table.Column
        dataIndex="products"
        className={styles.column}
        render={(products: any["products"]) => {
          if (!products.length) {
            return <Typography.Text>-</Typography.Text>;
          }

          const uniqueProducts = getUniqueListWithCount({ list: products, field: "id" });

          return (
            <Space
              size={0}
              direction="vertical"
              style={{
                maxWidth: "220px",
              }}
            >
              {uniqueProducts.map((product) => (
                <Flex key={product.id} gap={4}>
                  <Typography.Text ellipsis>{product.name}</Typography.Text>
                  <span
                    style={{
                      color: token.colorTextSecondary,
                    }}
                  >
                    x{product.count}
                  </span>
                </Flex>
              ))}
            </Space>
          );
        }}
      />
      <Table.Column
        dataIndex="amount"
        className={styles.column}
        align="end"
        render={(amount) => {
          return (
            <NumberField
              value={amount}
              style={{
                whiteSpace: "nowrap",
              }}
              options={{
                style: "currency",
                currency: "USD",
              }}
            />
          );
        }}
      />
      <Table.Column
        fixed="right"
        key="actions"
        className={styles.column}
        align="end"
        // @ts-ignore
        render={(_, record) => <ResponseTestActions record={record} />}
      />
    </Table>
  );
};
