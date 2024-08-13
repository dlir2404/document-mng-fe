'use client'
import { Col, Form, Input, Modal, Row } from "antd";
import { useTabsContext } from "../layouts/MainLayout";
import { goingAttribute, incomeAttribute } from "../../constants/attribute";
import { formatDate } from "../../utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { handlePdfLink } from "../../utils/handlePdfLink";

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
    const handleCancel = () => {
        setIsOpen(false)
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