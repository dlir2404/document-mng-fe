'use client'
import { Modal } from "antd";
import { useState } from "react"
import { useAppContext } from "@/app/app-provider";
import { useAcceptProcessGoing } from "../../services/document";

const AcceptProcessGoing = ({
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

    const acceptGoing = useAcceptProcessGoing(() => {
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
        acceptGoing.mutate({
            documentId,
            token: appContext.token
        })
    }

    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={600} closable={true} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>Tiếp nhận giải quyết văn bản này?</div>
            </Modal>
        </>
    )
}

export default AcceptProcessGoing