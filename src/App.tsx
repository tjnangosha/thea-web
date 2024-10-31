import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider, RefineKbar } from "@refinedev/kbar";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
} from "@refinedev/antd";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  ShoppingOutlined,
  ShopOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { authProvider, dataProvider } from "./providers";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { TestList, TestShow } from "./pages/tests";
import { AuthPage } from "./pages/auth";
import { SubjectShow, SubjectList } from "./pages/subjects";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
} from "./pages/products";
import { useTranslation } from "react-i18next";
import { Header, Title } from "./components";
import { BikeWhiteIcon } from "./components/icons";
import { ConfigProvider } from "./context";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {

  // const { t, i18n } = useTranslation();

  // const i18nProvider = {
  //   translate: (key: string, params: object) => t(key, params),
  //   changeLocale: (lang: string) => i18n.changeLanguage(lang),
  //   getLocale: () => i18n.language,
  // };

  return (
    <BrowserRouter>
      <ConfigProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            // i18nProvider={i18nProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "overview",
                list: "/",
                meta: {
                  label: "Overview",
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "tests",
                list: "/tests",
                show: "/tests/:id",
                meta: {
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  icon: <ShoppingOutlined />,
                },
              },
              {
                name: "subjects",
                list: "/subjects",
                show: "/subjects/:id",
                meta: {
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  icon: <UserOutlined />,
                },
              },
              {
                name: "hotspots",
                list: "/hotspots",
                create: "/hotspots/new",
                edit: "/hotspots/:id/edit",
                show: "/hotspots/:id",
                meta: {
                  // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
                  icon: <FireOutlined />,
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <div
                        style={{
                          maxWidth: "1200px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <Outlet />
                      </div>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />

                <Route path="/tests">
                  <Route index element={<TestList />} />
                  <Route path=":id" element={<TestShow />} />
                </Route>

                <Route
                  path="/subjects"
                  element={
                    <SubjectList>
                      <Outlet />
                    </SubjectList>
                  }
                >
                  <Route path=":id" element={<SubjectShow />} />
                </Route>
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="overview" />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      registerLink={false}
                      forgotPasswordLink={false}
                      rememberMe={true}
                      formProps={{
                          initialValues: {
                            remember: false
                          }
                      }}
                    />
                  }
                />
                {/* <Route
                  path="/register"
                  element={
                    <AuthPage
                      type="register"
                    />
                  }
                /> */}
                {/* <Route
                  path="/forgot-password"
                  element={<AuthPage type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage type="updatePassword" />}
                />*/}
              </Route> 

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
            <RefineKbar />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
