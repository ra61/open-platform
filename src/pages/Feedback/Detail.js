import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Icon, Badge, Button, Form, message, Modal, Upload, Input } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import TimelineDialog from '@/components/TimelineDialog';
import styles from './Detail.less';

const { Description } = DescriptionList;
const { TextArea } = Input;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, handleSubmit, getFieldDecorator } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };

    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 14 },
    };

    return (
        <Modal
            destroyOnClose
            title='回复'
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width={800}
        >

            <Form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
                <Form.Item {...formItemLayout} label="应用描述">
                    {getFieldDecorator('goal', {
                        rules: [
                            {
                                message: '请输入应用描述',
                            },
                        ],
                    })(
                        <TextArea
                            style={{ minHeight: 32 }}
                            placeholder="请输入应用描述"
                            rows={4}
                        />
                    )}
                </Form.Item>

                <Form.Item
                    {...formItemLayout}
                    label="上传附件"
                    extra="支持扩展名：jpg, bmp, png, gif, txt, log, docx"
                >
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        // getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                        </Button>
                        </Upload>
                    )}
                </Form.Item>
            </Form>

        </Modal>
    );
});

@connect(({ feedback, loading }) => ({
    feedback,
    loading: loading.effects['feedback/fetchDetail'],
}))
@Form.create()
class Detail extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'feedback/fetchDetail',
        });
    }

    state = {
        modalVisible: false
    };

    // 回传数据
    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'rule/add',
            payload: {
                desc: fields.desc,
            },
        });

        message.success('添加成功');
        this.handleModalVisible();
    };

    // 控制弹窗显示
    handleModalVisible = (flag) => {

        this.setState({
            modalVisible: !!flag,
        });

    };

    // 弹窗提交
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

    render() {
        const { feedback, loading } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;
        const { modalVisible } = this.state;
        const { feedbackDetail } = feedback;

        const dialogList = [
            {
                talker:'user',
                userName:'用户',
                content:'开发者社区访问慢',
                date:'2020-06-01 08:00'
            }, 
            {
                talker: 'server',
                serverName:'售后工程师',
                content: '你胡说八道',
                date: '2020-06-01 08:00'
            }
        ]

        const process = 'processing';

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleSubmit: this.handleSubmit,
            getFieldDecorator: getFieldDecorator,
        };

        return (
            <PageHeaderWrapper title="反馈详情">
                <Card>
                    <DescriptionList size="large" style={{ marginBottom: 32 }}>
                        <Description><Icon type="question-circle" style={{ marginRight: 5 }} />开发者社区访问慢</Description>
                        <Description>
                            {
                                process === 'pending' ? (
                                    <Badge status="success" text="待处理" />
                                ) : (
                                    <Badge status="processing" text="处理中" />
                                )
                            }
                        </Description>
                        <Description>2020-06-01 08:00</Description>
                    </DescriptionList>
                    <DescriptionList size="large" >
                        <Description term="问题类型">
                            <p>开发者社区访问慢</p>
                        </Description>
                    </DescriptionList>
                    <DescriptionList size="large" >
                        <Description term="问题描述">
                            <p>开发者社区访问慢</p>
                        </Description>
                    </DescriptionList>
                </Card>
                <TimelineDialog list={dialogList}></TimelineDialog>
                <Button type="primary" onClick={() => this.handleModalVisible(true)} style={{float:'right', marginRight:60}}>回复</Button>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
            </PageHeaderWrapper>
        );
    }
}

export default Detail;
