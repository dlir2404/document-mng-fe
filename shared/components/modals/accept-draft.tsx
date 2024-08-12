'use client'
import { Modal } from "antd";
import { useState } from "react"
import { useAppContext } from "@/app/app-provider";
import { useAcceptDraft, useAcceptProcessIncome } from "../../services/document";

const AcceptDraft = ({
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

    const acceptDraft = useAcceptDraft(() => {
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
        acceptDraft.mutate({
            documentId,
            token: appContext.token
        })
    }

    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={600} closable={true} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>Phê duyệt dự thảo này?</div>
            </Modal>
        </>
    )
}

export default AcceptDraft