'use client'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Upload } from "antd";
import { useState } from "react"
import { incomeAttribute } from "../../constants/attribute";
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useGetUserByRole } from "../../services/user";
import { usePresentToLeader } from "../../services/document";

const PresentToLeaderModal = ({
    isOpen,
    setIsOpen,
    onOk,
    documentId
}: {
    isOpen: boolean,
    onOk?: Function,
    setIsOpen: Function,
    documentId?: number
}) => {
    const [form] = useForm()
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const appContext = useAppContext()

    const { data } = useGetUserByRole(2)
    const present = usePresentToLeader(() => {
        onOk && onOk()
        setIsConfirmLoading(false)
        setIsOpen(false)
        form.resetFields()
    }, () => {
        setIsConfirmLoading(false)
    })

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const handleFinish = (values: any) => {
        setIsConfirmLoading(true)
        present.mutate({
            ...values,
            documentId,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Trình văn bản đến lãnh đạo" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label='Chọn lãnh đạo cần trình'
                                name='leaderId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    options={data?.data?.rows.map((row: any) => {
                                        return {
                                            label: row.username,
                                            value: row.id
                                        }
                                    }) || []}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Độ khẩn'
                                name='emergencyLevel'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            label: 'Bình thường',
                                            value: 'normal'
                                        },
                                        {
                                            label: 'Khẩn',
                                            value: 'emergency'
                                        },
                                        {
                                            label: 'Thượng khẩn',
                                            value: 'super_emergency'
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default PresentToLeaderModal