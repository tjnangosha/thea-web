import { useDelete, useInvalidate, useNavigation, useTranslate, useUpdate } from "@refinedev/core";
import { FolderAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { TableActionButton } from "../../tableActionButton";
import { ResponseSubject } from "../../../interfaces";

type SubjectActionProps = {
  subject: ResponseSubject
};

export const SubjectActions: React.FC<SubjectActionProps> = ({ subject }) => {
  const t = useTranslate();
  const { mutate } = useDelete();
  const navigate = useNavigate()
  const invalidate = useInvalidate();
  const mutateUpdate = useUpdate().mutate;

  const moreMenu = (subject: ResponseSubject) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      {/* <Menu.Item
        key="archive"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          <FolderAddOutlined
            style={{
              color: "#6c757d",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          mutateUpdate({
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
      </Menu.Item> */}
      <Menu.Item
        key="delete"
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
        onClick={() =>
          mutate(
            {
              resource: "subjects",
              id: subject.id,
              successNotification: () => {
                return {
                  message: `Deleted subject: ${subject.id}.`,
                  description: "Success",
                  type: "success",
                };
              },
              errorNotification: () => {
                return {
                  message: `Could not delete subject:  ${subject.id}`,
                  description: "Error",
                  type: "error",
                };
              }
          },
          {
            onSuccess: async () => {
              await invalidate({
                resource: "subjects",
                invalidates: ["all"],
              });
              navigate("/subjects");
            },

          }
        )
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
