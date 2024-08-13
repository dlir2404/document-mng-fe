'use client'
import { Col, Form, Input, Modal, Row } from "antd";
import { useTabsContext } from "../layouts/MainLayout";
import { goingAttribute, incomeAttribute } from "../../constants/attribute";
import { formatDate } from "../../utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { handlePdfLink } from "../../utils/handlePdfLink";
import { useGetDocumentTicket } from "../../services/document";
import { useAppContext } from "@/app/app-provider";

const DocumentDetail = ({
    isOpen,
    setIsOpen,
    document
}: {
    isOpen: boolean,
    setIsOpen: Function,
    document?: any
}) => {
    const tabsContext = useTabsContext()
    const appContext = useAppContext()

    const { data } = useGetDocumentTicket({
        documentId: document?.id,
        type: tabsContext.tabKey
    }, appContext.token)

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleShowTicketTitle = () => {
        if (!data) return ''

        if (data?.draftTicket) {
            return 'Phiếu yêu cầu xử lý văn bản đến'
        }

        return 'Phiếu chỉ đạo xử lý văn bản đến'
    }

    const handleShowTicketLabel = () => {
        if (!data) return ''

        if (data?.draftTicket) {
            return 'Số phiếu yêu cầu xử lý văn bản đến'
        }

        return 'Số phiếu chỉ đạo xử lý văn bản đến'
    }

    return (
        <>
            <Modal
                width={1200}
                closable={true}
                title={'Thông tin văn bản đến'}
                open={isOpen && tabsContext.tabKey === 'income-document'}
                onCancel={handleCancel}
                footer={() => <></>}>
                <Form
                    layout="horizontal"
                    style={{ maxWidth: 1200 }}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    wrapperCol={{ span: 16 }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={incomeAttribute['originalNumber']}>
                                <Input disabled value={document?.originalNumber}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['number']}>
                                <Input disabled value={document?.number}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['arrivalDate']}>
                                <Input disabled value={document?.arrivalDate ? formatDate(document?.arrivalDate) : ''}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['signer']}>
                                <Input disabled value={document?.signer}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['sendFrom']}>
                                <Input disabled value={document?.sendFrom}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['sendTo']}>
                                <Input disabled value={document?.sendTo}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['emergencyLevel']}>
                                <Input disabled value={document?.emergencyLevel}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['thematic']}>
                                <Input disabled value={document?.thematic}></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={incomeAttribute['leader']}>
                                <Input disabled value={document?.leader?.username}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['mainProcessor']}>
                                <Input disabled value={document?.mainProcessor?.username}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['collaborators']}>
                                <Input disabled value={document?.collaborators}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['category']}>
                                <Input disabled value={document?.category}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['abstract']}>
                                <Input disabled value={document?.abstract}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['incomeUrl']}>
                                {document?.incomeUrl && (
                                    <Link target="_blank" href={handlePdfLink(document?.incomeUrl)}>
                                        <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
                                    </Link>
                                )}
                            </Form.Item>
                            <Form.Item label={incomeAttribute['abstractDraft']}>
                                <Input disabled value={document?.abstractDraft}></Input>
                            </Form.Item>
                            <Form.Item label={incomeAttribute['draftUrl']}>
                                {document?.draftUrl && (
                                    <Link target="_blank" href={handlePdfLink(document?.draftUrl)}>
                                        <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
                                    </Link>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {data && (
                        <>
                            <Row className="justify-center mt-4">
                                <div className="font-bold">{handleShowTicketTitle()}</div>
                            </Row>
                            <Form
                                layout="vertical"
                                style={{ maxWidth: 1200 }}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label={handleShowTicketLabel()}>
                                            <Input disabled value={data?.draftTicket ? data?.draftTicket.id : data.commandTicket?.id || ''}></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={incomeAttribute['deadline']}>
                                            <Input disabled value={formatDate(document?.deadline)}></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label={'Nội dung phương hướng xử lý'}>
                                            <Input disabled value={data?.draftTicket ? data?.draftTicket.processDirection : data.commandTicket?.processDirection || ''}></Input>
                                        </Form.Item>
                                    </Col>
                                    {(data?.draftTicket?.returnReason || data?.commandTicket?.returnReason) && (
                                        <Col span={24}>
                                            <Form.Item label={'Lý do trả lại'}>
                                                <Input disabled value={data?.draftTicket?.returnReason || data?.commandTicket?.returnReason || ''}></Input>
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>
                            </Form>
                        </>
                    )}
                </Form>
            </Modal>
            <Modal
                width={1200}
                closable={true}
                title={'Thông tin văn bản đi'}
                open={isOpen && tabsContext.tabKey === 'going-document'}
                onCancel={handleCancel}
                footer={() => <></>}>
                <Form
                    layout="horizontal"
                    style={{ maxWidth: 1200 }}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    wrapperCol={{ span: 16 }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={goingAttribute['number']}>
                                <Input disabled value={document?.number}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['signDate']}>
                                <Input disabled value={document?.signDate ? formatDate(document?.signDate) : ''}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['signer']}>
                                <Input disabled value={document?.signer}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['sendFrom']}>
                                <Input disabled value={document?.sendFrom}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['sendTo']}>
                                <Input disabled value={document?.sendTo}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['emergencyLevel']}>
                                <Input disabled value={document?.emergencyLevel}></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={goingAttribute['mainProcessor']}>
                                <Input disabled value={document?.mainProcessor?.username}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['collaborators']}>
                                <Input disabled value={document?.collaborators}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['thematic']}>
                                <Input disabled value={document?.thematic}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['category']}>
                                <Input disabled value={document?.category}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['abstractDraft']}>
                                <Input disabled value={document?.abstractDraft}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['draftUrl']}>
                                {document?.draftUrl && (
                                    <Link target="_blank" href={handlePdfLink(document?.draftUrl)}>
                                        <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
                                    </Link>
                                )}
                            </Form.Item>
                            <Form.Item label={goingAttribute['abstract']}>
                                <Input disabled value={document?.abstract}></Input>
                            </Form.Item>
                            <Form.Item label={goingAttribute['goingUrl']}>
                                {document?.goingUrl && (
                                    <Link target="_blank" href={handlePdfLink(document?.goingUrl)}>
                                        <Image width={24} height={24} alt="pdf" src="/pdf-icon.png" />
                                    </Link>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default DocumentDetail