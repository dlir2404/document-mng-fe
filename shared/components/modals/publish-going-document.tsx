'use client'
import { Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react"
import { useAppContext } from "@/app/app-provider";
import { usePublishGoingDocument } from "../../services/document";
import { useForm } from "antd/es/form/Form";

const PublishGoingDocument = ({
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
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const appContext = useAppContext()
    const [form] = useForm()

    const publishGoingDocument = usePublishGoingDocument(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        onOk && onOk()
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
        publishGoingDocument.mutate({
            ...values,
            documentId,
            token: appContext.token
        })
    }

    return (
        <>
            <Modal title='Phát hành văn bản đi' confirmLoading={isConfirmLoading} width={600} closable={true} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label='Cấp số văn bản đi'
                        name='number'
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống trường này'
                            }
                        ]}
                    >
                        <Input ></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PublishGoingDocument