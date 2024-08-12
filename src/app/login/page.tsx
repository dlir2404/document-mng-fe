'use client'
import { Button, Form, Input, notification } from "antd"
import { useLogin } from "../../../shared/services/user"
import { useRouter } from "next/navigation"
import { CookieKeys } from "../../../shared/constants/cookie"
import { useAppContext } from "../app-provider"
import { useEffect, useState } from "react"

const LoginPage = () => {
    const router = useRouter()
    const appContext = useAppContext()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (appContext.user && localStorage.getItem(CookieKeys.accessToken)) {
            router.push('/')
        }
    })

    const login = useLogin((token: string) => {
        localStorage.setItem(CookieKeys.accessToken, token)
        appContext.setToken(token)
        notification.success({
            message: "Đăng nhập thành công"
        })
        setLoading(false)
        router.push("/")
    }, () => setLoading(false))

    const onFinish = (values: { username: string, password: string }) => {
        setLoading(true)
        login.mutate(values)
    }

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0">
            <div className="p-4 border-2 rounded-lg border-gray-400">
                <div className="text-center pb-4 font-bold text-lg">Đăng nhập</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}

export default LoginPage