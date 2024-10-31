import {
  useTranslate,
  type HttpError,
  getDefaultFilter,
  useExport,
  useGo,
  useNavigation,
} from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  FilterDropdown,
  getDefaultSortOrder,
  ExportButton,
} from "@refinedev/antd";
import {
  Table,
  Avatar,
  Typography,
  theme,
  InputNumber,
  Input,
  Select,
  Button,
} from "antd";

import type { ResponseSubject } from "../../interfaces";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import type { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export const SubjectList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();

  const { tableProps, filters, sorters } = useTable<ResponseSubject>({
    syncWithLocation: true,
  });

  return (
    <List
      breadcrumb={false}
      headerProps={{
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
        scroll={{ x: true }}
      >
        <Table.Column
          key="id"
          dataIndex="id"
          title="ID"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }}
            />
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("orders.filter.id.placeholder")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="fullName"
          dataIndex="name"
          title="Name"
          defaultFilteredValue={getDefaultFilter(
            "fullName",
            filters,
            "contains",
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                style={{ width: "100%" }}
                placeholder={t("users.filter.name.placeholder")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="createdAt"
          dataIndex="created_at"
          title="Date Registered"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column<ResponseSubject>
          fixed="right"
          title="Actions"
          render={(_, record) => (
            <Button
              // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
              icon={<EyeOutlined />}
              onClick={() => {
                return go({
                  to: `${showUrl("subjects", record.id)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
            />
          )}
        />
      </Table>
      {children}
    </List>
  );
};
