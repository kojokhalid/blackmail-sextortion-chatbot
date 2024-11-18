import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Drawer, Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

interface Props {
  children: React.ReactNode;
}

const AntSideBar = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleBreakpoint = (broken: boolean) => {
    setIsMobile(broken);
    setCollapsed(broken); // Collapse the Sider when switching to mobile
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile ? (
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={handleBreakpoint}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
      ) : (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }} // Remove padding
          width={250} // Set desired width for the drawer
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Drawer>
      )}
      <Layout className="bg-slate-900">
        <Header className="p-0 bg-inherit">
          <Button
            type="text"
            icon={
              collapsed || isMobile ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() =>
              isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)
            }
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="text-white"
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer
          style={{ textAlign: "center" }}
          className="bg-mwhite text-mblack"
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AntSideBar;
