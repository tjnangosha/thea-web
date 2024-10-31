import {
  useTranslate,
  useExport,
  useNavigation,
  type HttpError,
  getDefaultFilter,
} from "@refinedev/core";

import {
  List,
  useTable,
  getDefaultSortOrder,
  DateField,
  NumberField,
  useSelect,
  ExportButton,
  FilterDropdown,
} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Select, Typography, theme, InputNumber, Button } from "antd";

import {
  OrderStatus,
  PaginationTotal,
  OrderTableColumnProducts,
} from "../../components";
import {ResponseTest} from "../../interfaces";

export const TestList = () => {
  const { token } = theme.useToken();

  const { tableProps, sorters, filters } = useTable<ResponseTest>();

  const t = useTranslate();
  const { show } = useNavigation();

  return (
    <List
      headerProps={{
      }}
    >
      <Table
        {...tableProps}
        rowKey="id"
      >
        <Table.Column dataIndex="test_id" title="ID" />
        <Table.Column dataIndex="test_date" title="Test date" render={(value, test: ResponseTest) => <DateField value={value} format="LLL" />} />
        <Table.Column dataIndex="subject" title="Subject" />
        <Table.Column dataIndex="disease" title="Disease" />
        <Table.Column dataIndex="result" title="Result" />
        <Table.Column dataIndex="test_center" title="Test center" />
      </Table>
    </List>
  );
};
