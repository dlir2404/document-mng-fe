'use client'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react"
import { incomeAttribute } from "../../constants/attribute";
import { useForm } from "antd/es/form/Form";
import { useUploadIncomeDocument } from "../../services/document";
import { useAppContext } from "@/app/app-provider";

const UploadIncomeModal = ({
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

    const upload = useUploadIncomeDocument(() => {
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
        values.arrivalDate = values.arrivalDate.toISOString()
        values.signDate = values.signDate.toISOString()

        setIsConfirmLoading(true)
        upload.mutate({
            ...values,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Upload văn bản đến" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Row>
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
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={incomeAttribute['originalNumber']} name='originalNumber'>
                                <Input />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['number']} name='number'>
                                <Input />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['arrivalDate']} name='arrivalDate'>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['signDate']} name='signDate'>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['signer']} name='signer'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={incomeAttribute['sendFrom']} name='sendFrom'>
                                <Input />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['sendTo']} name='sendTo'>
                                <Input />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['thematic']} name='thematic'>
                                <Input />
                            </Form.Item>
                            <Form.Item label={incomeAttribute['category']} name='category'>
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
                            <Form.Item label={incomeAttribute['abstract']} name='abstract'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UploadIncomeModal