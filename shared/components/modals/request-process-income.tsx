'use client'
import { Col, DatePicker, Form, Input, Modal, notification, Row, Select, Upload } from "antd";
import { useEffect, useState } from "react"
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useGetListSpecialist } from "../../services/user";
import { useGetListRoom } from "../../services/room";
import { useGetLastTicket, useRequestProcessIncome } from "../../services/document";

const RequestProcessIncome = ({
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
    const [room, setRoom] = useState()
    const appContext = useAppContext()
    const [specialistOptions, setSpecialistOptions] = useState<any[]>([])
    const [specialist, setSpecialist] = useState<number | undefined>()
    const [collaboratorOptions, setCollaboratorOptions] = useState<any[]>([])

    const requestProcessIncome = useRequestProcessIncome(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        form.resetFields()
        onOk && onOk()
    }, () => {
        setIsConfirmLoading(false)
    })

    const { data: rooms } = useGetListRoom()
    const { data: specialists } = useGetListSpecialist(room)
    const { data: lastTicket } = useGetLastTicket('command', 'income')

    useEffect(() => {
        if (!room) {
            setSpecialistOptions([])
        } else {
            setSpecialistOptions(specialists?.data?.rows.map((specialist: any) => {
                return {
                    label: specialist.fullName,
                    value: specialist.id
                }
            }) || [])
        }
    }, [room, specialists])

    useEffect(() => {
        if (!specialist) {
            setCollaboratorOptions([])
        } else {
            setCollaboratorOptions(specialistOptions.filter((specialistOption) => specialistOption.value !== specialist))
        }
    }, [specialist])


    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const handleFinish = (values: any) => {
        values.deadline = values.deadline?.toISOString()
        values.token = appContext.token
        values.documentId = documentId
        setIsConfirmLoading(true)
        requestProcessIncome.mutate(values)
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Phiếu chỉ đạo xử lý văn bản đến" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label='Số phiếu chỉ đạo xử lý văn bản đến'>
                                <Input value={lastTicket?.id + 1 || 1} disabled></Input>
                            </Form.Item>
                            <Form.Item
                                label='Hạn xử lý'
                                name='deadline'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Chọn phòng'
                                name='roomId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    onChange={(value) => setRoom(value)}
                                    options={rooms?.data?.rows.map((room: any) => {
                                        return {
                                            label: room.name,
                                            value: room.id
                                        }
                                    })}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Chọn chuyên viên chủ trì xử lý'
                                name='specialistId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    options={specialistOptions}
                                    onChange={(e) => setSpecialist(e)}
                                />
                            </Form.Item>
                            <Form.Item label='Chọn chuyên viên phối hợp xử lý' name='collaborators' dependencies={['specialistId']}>
                                <Select
                                    mode="multiple"
                                    options={collaboratorOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label='Nội dung phương hướng chỉ đạo xử lý'
                                name='processDirection'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default RequestProcessIncome