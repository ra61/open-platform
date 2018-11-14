import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Tooltip, Icon, Button, Upload, Divider, Form, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { removeFromArray } from '@/utils/common';
import styles from './Resource.less';

const { Option } = Select;

@connect(({ resource, loading }) => ({
    resource,
    loading: loading.effects['resource/fetchResourceList']
}))
@Form.create()
class Resource extends Component {

    constructor(props) {
        super(props);

        this.params = {
            id: this.props.location.query.id,
            key: this.props.location.query.appKey
        }

        this.state = {
            version: '5.2.8',
            expandedRows: [], // 展开行的数组
            pageIndex: 1,
            pageSize: 5
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        

        dispatch({
            type: 'resource/fetchResourceVersion',
            payload: {
                appKey: this.params.key
            }
        });

        dispatch({
            type: 'resource/fetchResourceList',
            payload: {
                appKey: this.params.key,
                version: this.state.version
            }
        });

        dispatch({
            type: 'resource/fetchGrammarFile',
            payload: {
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize
            }
        });
    }

    // 获取所有key
    getKeys = function (array, allKeys) {
        for (let i = 0; i < array.length; i++) {
            if (allKeys.indexOf(array[i].key) < 0) {
                allKeys.push(array[i].key);
            }

            if (array[i].children && array[i].children.length > 0) {
                this.getKeys(array[i].children, allKeys);
            }
        }
    }

    // 展开
    allExpand = (sourceFile) => {
        let expandedRows = [];
        this.getKeys(sourceFile, expandedRows);
        // 更新状态
        this.setState({ expandedRows });
    }

    // 收缩
    allContract = () => {
        let expandedRows = [];
        // 更新状态
        this.setState({ expandedRows });
    }

    handleOnExpand(expanded, record) {	//修改图标点击默认执行方法  获取自己维护的 数组，判断数组中是否包含 这行key，相应添加或者删除    
        let expandedRows = this.state.expandedRows;
        if (expanded) {
            expandedRows.push(record.key);
        } else {
            removeFromArray.call(expandedRows, record.key)

        }
        this.setState({ expandedRows });

    }

    // 切换版本
    handleChange = (value) => {
        const { dispatch } = this.props;
        
        dispatch({
            type: 'resource/fetchResourceList',
            payload: {
                appKey: this.params.key,
                version: value.version
            }
        });
    }

    // 切换页码
    handleListChange = (pageIndex, pageSize) => {
        let params = {
            pageIndex: pageIndex,
            pageSize: pageSize,
        };

        this.setState({ pageIndex: pageIndex, pageSize: pageSize });

        this.props.dispatch({
            type: 'resource/fetchGrammarFile',
            payload: params,
        });
    };

    render() {
        const { resource, loading } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;

        const { pageIndex, pageSize } = this.state;
        const { versionList, resourceList, grammarFile, totalCount } = resource;

        const sourceColumns = [
            {
                title: '能力(capkey)',
                dataIndex: 'title',
            },
            {
                title: '说明',
                dataIndex: 'comment',
            },
            {
                title: '下载',
                render: (text, record) => (
                    <Fragment>
                        {
                            record.file_url && <a href={record.file_url}>下载</a>
                        }
                    </Fragment>
                ),
            },
        ];

        const grammarColumns = [
            {
                title: 'grammarId',
                dataIndex: 'grammarId',
            },
            {
                title: '文件名',
                dataIndex: 'fileName',
            },
            {
                title: '类型',
                dataIndex: 'type',
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Fragment>
                        <a href={'/api2' + record.url}>下载</a>
                        <Divider type="vertical" />
                        <a onClick={() => deleteGrammarFile(record)}>删除</a>
                    </Fragment>
                ),
            },
        ];

        const deleteGrammarFile = (record) => {
            const { dispatch } = this.props;

            dispatch({
                type: 'resource/deleteGrammarFile',
                payload: {
                    grammarId: record.grammarId,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    totalCount: totalCount
                }
            })
        }

        const extraContent = (
            <div className={styles.extraContent}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item style={{ marginBottom: 0 }}>
                        {getFieldDecorator('version', {
                            initialValue: versionList[0]
                        })(
                            <Select style={{ width: 100 }} onChange={this.handleChange}>
                                {
                                    versionList.map((item, index) => (
                                        <Option value={item} key={index}>{item}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </div>
        );

        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: false,
            pageSize: pageSize,
            current: pageIndex,
            total: totalCount,
            onChange: (pageIndex, pageSize) => {
                this.handleListChange(pageIndex, pageSize)
            },
            onShowSizeChange: (pageIndex, pageSize) => {
                this.handleListChange(pageIndex, pageSize)
            },
        };

        const upload_grammar = {
            name: 'file',
            action: '/api2/dev/grammar/ajaxAddGrammar',
            headers: {
                authorization: 'authorization-text',
            },
            onChange:(info) => {
                // if (info.file.status !== 'uploading') {
                //     console.log(info.file, info.fileList);
                // }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功`);
                    this.handleListChange(1, 5);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
            },
        }
        
        return (
            <GridContent>

            
                <Card title={
                    <span>
                        <FormattedMessage
                            id="myapps.detail.resource.download"
                            defaultMessage="resource download" />
                        <Tooltip
                            title={
                                <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                            }
                        >
                            <Icon type="question-circle" theme="outlined" style={{marginLeft:10}} />
                        </Tooltip>
                    </span>
                }
                style={{padding:0}}
                extra={extraContent}
                bordered={false}>
                    <Table
                        style={{ marginBottom: 16 }}
                        rowKey={record => record.key}
                        pagination={false}
                        loading={loading}
                        dataSource={resourceList}
                        columns={sourceColumns}
                        expandedRowKeys={this.state.expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />

                    <div style={{ marginTop: 15 }}>
                        <Button type="primary" onClick={() => this.allExpand(resourceList)}><Icon type="down-circle" />展开</Button>
                        <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}><Icon type="up-circle" />收缩</Button>
                    </div>
                </Card>

                <Card title={
                    <span>
                        <FormattedMessage
                            id="myapps.detail.grammar.file"
                            defaultMessage="grammar download" />
                        <Tooltip
                            title={
                                <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                            }
                        >
                            <Icon type="question-circle" theme="outlined" style={{ marginLeft: 10 }} />
                        </Tooltip>
                    </span>
                }
                style={{ marginTop: 24}}
                bordered={false}>
                    <Fragment>
                        <span>上传语法文件：</span>
                        <Upload {...upload_grammar}>
                            <div className={styles.button_view}>
                                <Button icon="upload">
                                    <FormattedMessage id="myapps.detail.resource.upload" defaultMessage="Upload file" />
                                </Button>
                            </div>
                        </Upload>
                        <div style={{ marginLeft: 100, marginTop: 10 }}>支持语法文件格式：wordlist .jsgf
                            <Tooltip
                                title={
                                    <FormattedMessage id="myapps.detail.resource.download" defaultMessage="resource download" />
                                }
                            >
                                <Icon type="question-circle" theme="outlined" style={{ marginLeft: 10 }} />
                            </Tooltip>
                        </div>
                        {/* <Button type="primary" htmlType="submit" style={{ marginLeft: 100, marginTop:10, marginBottom:20 }}>提交上传</Button> */}
                    </Fragment>
                    <Table
                        style={{ marginBottom: 16, marginTop: 20 }}
                        pagination={paginationProps}
                        loading={loading}
                        dataSource={grammarFile}
                        columns={grammarColumns}
                    />
                </Card>
            
                
            
            </GridContent>
        );
    }
}

export default Resource;
