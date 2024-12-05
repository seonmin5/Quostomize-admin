'use client'

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ApproveSpinner from "../../components/spinner/approveSpinner";

const MerchantModal = ( {visible, onCancel = () => {}, onSave}) => {
    const [isClient, setIsClient] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        files: [],
        relatedDocs: [],
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // visible이 변경될 때마다 formData를 form에 적용
        if (visible) {
            form.setFieldsValue(formData);
        } else {
            // 모달이 닫힐 때 기존 데이터 초기화
            setFormData({
                title: '',
                content: '',
                files: [],
                relatedDocs: [],
            });
            form.resetFields();
        }
    }, [visible]);

    if (!isClient) return null;

    const draftApprovalData = [
        { name: '로그인명', position: '대리', approvalType: '기안' },
        { name: '오선민', position: '과장', approvalType: '검토 필요' },
    ];

    const processingApprovalData = [
        { name: '김현우', position: '과장', approvalType: '확인 필요' },
        { name: '기남석', position: '팀장', approvalType: '확인 필요' },
    ];

    const columns = [
        {
            title: '결재자명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '직위',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '결재구분',
            dataIndex: 'approvalType',
            key: 'approvalType',
        },
    ];

    // const handleSubmit = () => {
    //     setLoading(true);  // 상신 버튼을 클릭하면 로딩 상태로 변경
    //     form.validateFields().then(values => {
    //         if (onSave) onSave(values);
    //         setFormData(values);  // 양식 데이터를 상태로 저장
    //
    //         // 시뮬레이션: 상신 완료 후 스피너를 종료하고 메시지 표시
    //         setTimeout(() => {
    //             setLoading(false);  // 로딩 종료
    //             setSuccessMessage('결재 상신이 완료되었습니다.');  // 완료 메시지 설정
    //
    //             // 3초 후 Modal 닫기
    //             setTimeout(() => {
    //                 onCancel();  // Modal 닫기
    //                 setSuccessMessage('');  // 완료 메시지 초기화
    //             }, 3000); // 3초 후 모달 닫기
    //         }, 1500); // 1.5초간 스피너를 돌린 뒤 처리 완료
    //     });
    // };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            title="가맹점 관리"
            footer={[
                <Button key="취소" onClick={onCancel}>취소</Button>,
                <Button
                    key="상신"
                    type="primary"
                    onClick={() => {
                        form.validateFields().then((values) => {
                            // 폼 데이터가 유효할 경우에만 로딩 상태로 전환
                            setLoading(true);
                            if (onSave) onSave(values);
                            setFormData(values);

                            // 시뮬레이션: 상신 완료 후 스피너를 종료하고 메시지 표시
                            setTimeout(() => {
                                setLoading(false);
                                setSuccessMessage('결재 상신이 완료되었습니다.');

                                // 3초 후 Modal 닫기
                                setTimeout(() => {
                                    onCancel();
                                    setSuccessMessage('');
                                }, 3000); // 3초 후 모달 닫기
                            }, 1500); // 1.5초간 스피너를 돌린 뒤 처리 완료
                        }).catch(() => {
                            // 폼 유효성 검사 실패 시 아무 작업도 하지 않음 (스피너 안 돌아감)
                        });
                    }}
                    disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}
                >
                    상신
                </Button>
            ]}
            width={900}
            bodyStyle={{
                height: '650px',
                overflowY: 'auto',
            }}
        >
            {/* 로딩 중일 때 스피너 표시 */}
            {loading && <ApproveSpinner message="결재 상신 중..." />}

            {/* 상신 완료 후 메시지 표시 */}
            {!loading && successMessage && (
                <div className="text-center text-xl text-[--primary-color] font-bold">
                    {successMessage}
                </div>
            )}

            <Form form={form} layout="vertical">
                <Form.Item
                    label="제목"
                    name="title"
                    required
                    rules={[{required: true, message: '제목을 입력해주세요'}]}
                >
                    <Input placeholder="제목을 입력하세요."/>
                </Form.Item>

                <Form.Item
                    label="내용"
                    name="content"
                    required
                    rules={[{required: true, message: '내용을 입력해주세요'}]}
                >
                    <Input.TextArea
                        rows={15}
                        placeholder="내용을 입력하세요"
                        className="mb-2"
                    />
                </Form.Item>

                <Form.Item label="파일 첨부" name="files">
                    <Upload>
                        <Button icon={<UploadOutlined/>}>파일 첨부</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="연관문서" name="relatedDocs">
                    <Upload>
                        <Button icon={<UploadOutlined/>}>연관문서</Button>
                    </Upload>
                </Form.Item>

                <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                        <span>기안부서 결재선</span>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={draftApprovalData}
                        pagination={false}
                        rowKey="name"
                        style={{marginBottom: '20px'}}
                    />

                    <div className="flex justify-between mb-2">
                        <span>처리부서 결재선</span>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={processingApprovalData}
                        pagination={false}
                        rowKey="name"
                    />
                </div>
            </Form>
        </Modal>
    );
};

export default MerchantModal;