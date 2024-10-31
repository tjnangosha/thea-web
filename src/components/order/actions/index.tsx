import { useTranslate, useUpdate } from "@refinedev/core";
import { FolderAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { TableActionButton } from "../../tableActionButton";
import { ResponseSubject } from "../../../interfaces";

type SubjectActionProps = {
  subject?: ResponseSubject
};

export const SubjectActions: React.FC<SubjectActionProps> = ({ subject }) => {
  const t = useTranslate();
  const { mutate } = useUpdate({ resource: "orders", id: subject?.id });

  const moreMenu = (subject: ResponseSubject) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        // disabled={subject.status.text !== "Pending"}
        icon={
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          <FolderAddOutlined
            style={{
              color: "orange",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          mutate({
            values: {
              status: {
                id: 2,
                text: "Ready",
              },
            },
          });
        }}
      >
        Archive
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          <DeleteOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        // disabled={
        //   subject.status.text === "Delivered" ||
        //   subject.status.text === "Cancelled"
        // }
        onClick={() =>
          mutate({
            values: {
              status: {
                id: 5,
                text: "Cancelled",
              },
            },
          })
        }
      >
       Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={moreMenu(subject)} trigger={["click"]}>
      <TableActionButton />
    </Dropdown>
  );
};
