'use client'
import { Modal } from "antd";
import { useState } from "react"
import { useAppContext } from "@/app/app-provider";
import { useAcceptProcessIncome } from "../../services/document";

const AcceptProcessIncome = ({
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

    const acceptProcessIncome = useAcceptProcessIncome(() => {
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
        setIsConfirmLoading(true)
        acceptProcessIncome.mutate({
            documentId,
            token: appContext.token
        })
    }

    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={600} closable={true} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>Chấp nhận xử lý văn bản này?</div>
            </Modal>
        </>
    )
}

export default AcceptProcessIncome