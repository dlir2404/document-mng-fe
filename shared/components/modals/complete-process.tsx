'use client'
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react"
import { incomeAttribute } from "../../constants/attribute";
import { useForm } from "antd/es/form/Form";
import { useUploadDraftDocument, useUploadIncomeDocument } from "../../services/document";
import { useAppContext } from "@/app/app-provider";

const CompleteProcess = ({
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

    const upload = useUploadDraftDocument(() => {
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
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Trình lãnh đạo phê duyệt xử lý văn bản đến" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
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
                    <Form.Item label='Trích yếu dự thảo văn bản đi' name='abstractDraft'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CompleteProcess