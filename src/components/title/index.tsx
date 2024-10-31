import { useLink } from "@refinedev/core";
import { Space, theme } from "antd";

import { TheaLogoIcon, TheaLogoText } from "../../components";
import { Logo } from "./styled";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { token } = theme.useToken();
  const Link = useLink();

  return (
    <Logo>
      <Link to="/">
        {collapsed ? (
          <TheaLogoIcon />
        ) : (
          <Space size={12}>
            <TheaLogoIcon
              style={{
                fontSize: "32px",
                color: token.colorTextHeading,
              }}
            />
            <TheaLogoText
              style={{
                color: token.colorTextHeading,
                width: "100%",
                height: "auto",
                fontSize: 15,
                fontWeight: "bolder"
              }}
            />
          </Space>
        )}
      </Link>
    </Logo>
  );
};
