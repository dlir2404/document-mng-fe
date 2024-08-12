'use client'
import { Modal } from "antd";
import { useState } from "react"
import { useAppContext } from "@/app/app-provider";
import { useDeleteIncome } from "../../services/document";

const DeleteIncome = ({
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

    const deleteDocument = useDeleteIncome(() => {
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
        deleteDocument.mutate({
            documentId,
            token: appContext.token
        })
    }

    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={600} closable={true} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>Xóa vĩnh viễn văn bản này?</div>
            </Modal>
        </>
    )
}

export default DeleteIncome