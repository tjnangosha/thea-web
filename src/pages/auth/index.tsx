import { AuthPage as AntdAuthPage, type AuthProps } from "@refinedev/antd";
import { Flex } from "antd";
import { Link } from "react-router-dom";
import { TheaLogoIcon, TheaLogoText } from "../../components";

const authWrapperProps = {
  style: {
    background: "#b3bac1 !important",
    backgroundSize: "cover",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: 408,
        margin: "auto",
      }}
    >
      <Link to="/">
        <Flex
          align="center"
          justify="center"
          gap={12}
          style={{
            marginBottom: 16,
          }}
        >
          {/* <TheaLogoIcon
            style={{
              width: 64,
              height: 64,
              color: "#fff",
            }}
          /> */}
          <TheaLogoText
            style={{
              color: "black",
              width: "100%",
              textAlign: "center",
              fontWeight: 600,
              height: "auto",
            }}
          />
        </Flex>
      </Link>
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ 
  type, 
  formProps,
  registerLink,
  forgotPasswordLink,
  rememberMe,
}) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      formProps={formProps}
      registerLink={registerLink}
      forgotPasswordLink={forgotPasswordLink}
      rememberMe={rememberMe}
    />
  );
};
