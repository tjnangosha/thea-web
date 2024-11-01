import {
  useTranslate,
  type HttpError,
  getDefaultFilter,
  useExport,
  useGo,
  useNavigation,
  type CrudFilters,
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
  Row,
  Form,
} from "antd";

import type { ResponseSubjectFilterVariables, ResponseSubject } from "../../interfaces";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { PaginationTotal, UserStatus } from "../../components";
import { useState, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

export const SubjectList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();
  const [searchText, setSearchText] =  useState("");

  const { tableProps, filters, sorters, searchFormProps } = useTable<ResponseSubject, HttpError, ResponseSubjectFilterVariables>({
    resource: "subjects",
    pagination: { current: 1, pageSize: 10, /* mode: "server",*/ },
    sorters: { initial: [{ field: "Name", order: "asc" }] },
    onSearch: (searchFormValues) => {
      // console.log("search form values: ", searchFormValues)
      const filters: CrudFilters = []
      const { name } = searchFormValues

      filters.push(
        {
          field: "name",
          operator: "eq",
          value: name
        }
      )

      return filters
    },
  });

  return (
    <>
    <Row gutter={[16, 16]} style={{boxSizing: "border-box", marginLeft: 0, marginBottom: 20}}>
      <Form layout="inline" {...searchFormProps}>
        <Form.Item name="name">
          <Input
            placeholder="Filter by name"
            // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
            prefix={<FilterOutlined />}
          />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" type="primary">
              Filter
            </Button>
          </Form.Item>
      </Form>
    </Row>
    <List
      breadcrumb={false}
      headerProps={{}}
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
            // defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
            />
          <Table.Column
            key="name"
            dataIndex="name"
            title="Name"
            defaultFilteredValue={getDefaultFilter(
              "fullName",
              filters,
              "contains"
            )}
          />
          <Table.Column
            key="createdAt"
            dataIndex="created_at"
            title="Date Registered"
            render={(value) => <DateField value={value} format="LLL" />} />
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
                } } />
            )} />
        </Table>
        {children}
      </List></>
  );
};
