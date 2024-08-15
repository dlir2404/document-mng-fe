'use client'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react"
import { incomeAttribute } from "../../constants/attribute";
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useUploadDocumentDraft } from "../../services/document";

const UploadGoingDraft = ({
    isOpen,
    setIsOpen,
    onOk
}: {
    isOpen: boolean,
    onOk?: Function,
    setIsOpen: Function
}) => {
    const [form] = useForm()
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const appContext = useAppContext()

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const upload = useUploadDocumentDraft(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        notification.success({
            message: "Upload thành công"
        })
        form.resetFields()
        onOk && onOk()
    }, (message?: string) => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        notification.error({
            message
        })
    })

    const handleFinish = (values: any) => {
        values.file = values.file.file.originFileObj
        values.arrivalDate = values.arrivalDate?.toISOString()
        values.signDate = values.signDate?.toISOString()

        setIsConfirmLoading(true)
        upload.mutate({
            ...values,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Thêm mới dự thảo văn bản đi" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Upload"
                                name='file'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn file'
                                    }
                                ]}
                            >
                                <Upload
                                    accept=".pdf"
                                    maxCount={1}
                                    onChange={({ file, fileList }) => {
                                        if (file.status !== 'uploading') {
                                            console.log(file);
                                        }
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={incomeAttribute['sendFrom']}
                                name='sendFrom'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={incomeAttribute['category']}
                                name='category'
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
                                            label: 'Công văn',
                                            value: 'Công văn'
                                        },
                                        {
                                            label: 'Chỉ thị',
                                            value: 'Chỉ thị'
                                        },
                                        {
                                            label: 'Quy chế',
                                            value: 'Quy chế'
                                        },
                                        {
                                            label: 'Quy định',
                                            value: 'Quy định'
                                        },
                                        {
                                            label: 'Thông cáo',
                                            value: 'Thông cáo'
                                        },
                                        {
                                            label: 'Thông báo',
                                            value: 'Thông báo'
                                        },
                                        {
                                            label: 'Hướng dẫn',
                                            value: 'Hướng dẫn'
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label={incomeAttribute['abstractDraft']}
                                name='abstractDraft'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UploadGoingDraft