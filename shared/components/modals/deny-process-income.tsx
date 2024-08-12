'use client'
import { Form, Input, Modal } from "antd";
import { useState } from "react"
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useDenyProcessIncome } from "../../services/document";

const DenyProcessIncome = ({
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

    const denyProcessIncome = useDenyProcessIncome(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        form.resetFields()
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
        values.token = appContext.token
        values.documentId = documentId
        setIsConfirmLoading(true)
        denyProcessIncome.mutate(values)
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Trả lại lãnh đạo" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Form.Item label='Lý do trả lại' name='returnReason'>
                        <Input ></Input>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DenyProcessIncome