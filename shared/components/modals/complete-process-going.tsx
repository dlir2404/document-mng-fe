'use client'
import { Button, Col, Form, Input, Modal, notification, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react"
import { useForm } from "antd/es/form/Form";
import { useCompleteProcessGoing } from "../../services/document";
import { useAppContext } from "@/app/app-provider";

const CompleteProcessGoing = ({
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

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const upload = useCompleteProcessGoing(() => {
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
        values.documentId = documentId
        values.token = appContext.token

        setIsConfirmLoading(true)
        upload.mutate({
            ...values,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Trình lãnh đạo phê duyệt xử lý văn bản đi" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Upload" name='file'>
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
                        <Col span={8}>
                            <Form.Item label='Nơi nhận' name='sendFrom'>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label='Thể loại' name='category'>
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
                        <Col span={8}>
                            <Form.Item label='Độ khẩn' name='emergencyLevel'>
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
                            <Form.Item label='Chuyên đề' name='thematic'>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='Trích yếu dự thảo văn bản đi' name='abstract'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CompleteProcessGoing