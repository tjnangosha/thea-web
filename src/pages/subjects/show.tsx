import { useShow, useNavigation } from "@refinedev/core";
import { Flex, Grid } from "antd";
import type { IUser, ResponseSubject } from "../../interfaces";
import {
  SubjectInfoList,
  SubjectInfoSummary,
  CustomerOrderHistory,
  Drawer,
} from "../../components";

export const SubjectShow = () => {
  const { list } = useNavigation();
  const breakpoint = Grid.useBreakpoint();
  const { query: queryResult } = useShow<ResponseSubject>({
    resource: "subjects",
  });

  const { data } = queryResult;
  const user = data?.data;

  return (
    <Drawer
      open
      onClose={() => list("subjects")}
      width={breakpoint.sm ? "736px" : "100%"}
    >
      <Flex
        vertical
        gap={32}
        style={{
          padding: "32px",
        }}
      >
        <SubjectInfoSummary subject={user} />
        <SubjectInfoList subject={user} />
      </Flex>
    </Drawer>
  );
};
