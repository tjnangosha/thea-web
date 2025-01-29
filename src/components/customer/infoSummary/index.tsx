import { Flex, Avatar, Typography } from "antd";
import type { ResponseSubject } from "../../../interfaces";
import { SubjectActions } from "../../order";

type Props = {
  subject: ResponseSubject;
};

export const SubjectInfoSummary = ({ subject }: Props) => {
  return (
    <Flex align="center" gap={32}>
      <Avatar size={96} src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" />
      <Flex vertical>
        <Typography.Text type="secondary">ID: {subject?.id}</Typography.Text>
        <Typography.Title
          level={3}
          style={{
            margin: 0,
          }}
        >
          {subject?.name}
        </Typography.Title>
      </Flex>
      <SubjectActions subject={subject} />
    </Flex>
  );
};
