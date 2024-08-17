'use client'
import { Col, Form, Input, Modal, Row } from "antd";
import { useTabsContext } from "../layouts/MainLayout";
import { formatDate } from "../../utils/formatDate";
import { useAppContext } from "@/app/app-provider";

const numRoleToText: { [key: number]: string } = {
    1: 'Admin',
    2: 'Lãnh đạo',
    3: 'Chuyên viên',
    4: 'Văn thư'
}

const UserDetail = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean,
    setIsOpen: Function,
}) => {
    const tabsContext = useTabsContext()
    const appContext = useAppContext()

    const user = appContext.user

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Modal
                width={600}
                closable={true}
                title={'Thông tin cá nhân'}
                open={isOpen && tabsContext.tabKey === 'income-document'}
                onCancel={handleCancel}
                footer={() => <></>}>
                <Form
                    layout="horizontal"
                    style={{ maxWidth: 1200 }}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item label={'Username'} >
                        <Input disabled value={user?.username}></Input>
                    </Form.Item>
                    <Form.Item label={'Mã chuyên viên'} >
                        <Input disabled value={user?.userNumber}></Input>
                    </Form.Item>
                    <Form.Item label={'Họ và tên'} >
                        <Input disabled value={user?.fullName}></Input>
                    </Form.Item>
                    <Form.Item label={'Chức danh'} >
                        <Input disabled value={user?.title}></Input>
                    </Form.Item>
                    <Form.Item label={'Chức vụ'} >
                        <Input disabled value={numRoleToText[user?.role]}></Input>
                    </Form.Item>
                    <Form.Item label={'Giới tính'} >
                        <Input disabled value={user?.gender === 'MALE' ? 'Nam' : user?.gender === 'FEMALE' ? 'Nữ' : 'Khác'}></Input>
                    </Form.Item>
                    <Form.Item label={'Ngày sinh'} >
                        <Input disabled value={formatDate(user?.dateOfBirth)}></Input>
                    </Form.Item>
                    <Form.Item label={'Địa chỉ'} >
                        <Input disabled value={user?.address}></Input>
                    </Form.Item>
                    <Form.Item label={'Số điện thoại'} >
                        <Input disabled value={user?.phone}></Input>
                    </Form.Item>
                    <Form.Item label={'Email'} >
                        <Input disabled value={user?.email}></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UserDetail