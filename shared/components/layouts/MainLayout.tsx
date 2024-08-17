'use client'

import { useAppContext } from "@/app/app-provider";
import { Avatar, Breadcrumb, Button, Layout, Menu, notification, Popover } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { createContext, useContext, useState } from "react";
import { CookieKeys } from "../../constants/cookie";
import { useRouter } from "next/navigation";
import UserDetail from "../modals/user-detail";

const TabsContext = createContext<{
    tabKey: string
    setTabKey: (tabKey: string) => void
}>({
    tabKey: 'income-document',
    setTabKey: () => { }
})

export const useTabsContext = function () {
    const context = useContext(TabsContext)
    return context
}

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // getMe()
    const [tabKey, setTabKey] = useState<string>('income-document')
    const [userDetail, setUserDetail] = useState(false)
    const appContext = useAppContext()
    const router = useRouter()

    const items: ItemType<MenuItemType>[] = [
        {
            key: 'income-document',
            label: 'Văn bản đến',
            onClick: () => setTabKey('income-document')
        },
        {
            key: 'going-document',
            label: 'Văn bản đi',
            onClick: () => setTabKey('going-document')
        },
        {
            key: 'report',
            label: 'Báo cáo',
            onClick: () => {alert('Coming soon!!!!!!!!!!!')}
        }
    ]

    const renderAvatarContent = () => {
        return <div>
            <Menu
                className="w-full"
                mode="inline"
                items={[
                    {
                        key: 'user-detail',
                        label: 'Thông tin cá nhân',
                        onClick: () => {
                            setUserDetail(true)
                        }
                    },
                    {
                        key: 'logout',
                        label: 'Đăng xuất',
                        onClick: () => {
                            router.push('/login')
                            appContext.setUser(null)
                            appContext.setToken('')
                            localStorage.removeItem(CookieKeys.accessToken)
                            notification.success({
                                message: "Đăng xuất thành công"
                            })
                        }
                    }
                ]}
            />
        </div>
    }

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="logo">
                    <img className="mr-6" src="/logo1.png" alt="" />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[tabKey]}
                    items={appContext.user ? items : []}
                    style={{ flex: 1, minWidth: 0 }}
                />
                {appContext.user && (
                    <Popover placement="bottomRight" content={renderAvatarContent} title={appContext.user.fullName} trigger="click">
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>
                )}
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: "calc(100vh - 133px)",
                        borderRadius: '10px',
                    }}
                >
                    <TabsContext.Provider
                        value={{
                            tabKey,
                            setTabKey
                        }}
                    >
                        {children}
                        {userDetail && (
                            <UserDetail isOpen={userDetail} setIsOpen={setUserDetail}/>
                        )}
                    </TabsContext.Provider>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                ©{new Date().getFullYear()} Created by Nguyễn Thái Hoàng
            </Footer>
        </Layout>
    );
}
