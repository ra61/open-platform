import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Select, Tooltip, Icon, Button, Upload, Divider } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { removeFromArray } from '@/utils/common';
import styles from './Resource.less';

const { Option } = Select;

const sourceColumns = [
    {
        title: '能力(capkey)',
        dataIndex: 'capacity',
    },
    {
        title: '说明',
        dataIndex: 'source',
    },
    {
        title: '下载',
        render: (text, record) => (
            <Fragment>
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>下载</a>
                <Divider type="vertical" />
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>打包下载</a>
            </Fragment>
        ),
    },
];

const grammarColumns = [
    {
        title: 'grammarid',
        dataIndex: 'grammarid',
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
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>下载</a>
                <Divider type="vertical" />
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>删除</a>
            </Fragment>
        ),
    },
];



@connect(({ files, loading }) => ({
    files,
    loading: loading.effects['files/fetchSource', 'files/fetchGrammar']
}))
class Resource extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'files/fetchSource',
        });

        dispatch({
            type: 'files/fetchGrammar',
        });
    }

    state = {
        expandedRows: [], // 展开行的数组
    };

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

    render() {
        const { files, loading } = this.props;
        const { sourceFile, grammarFile } = files;

        const extraContent = (
            <div className={styles.extraContent}>
                <Select defaultValue="alipay" style={{ width: 100 }} >
                    <Option value="alipay">5.2.8</Option>
                    <Option value="bank">5.2.0</Option>
                    <Option value="tts">3.8</Option>
                </Select>
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };
        
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
                        pagination={false}
                        loading={loading}
                        dataSource={sourceFile}
                        columns={sourceColumns}
                        expandedRowKeys={this.state.expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />

                    <div style={{ marginTop: 15 }}>
                        <Button type="primary" onClick={() => this.allExpand(sourceFile)}><Icon type="down-circle" />展开</Button>
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
                        <Upload fileList={[]}>
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
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 100, marginTop:10, marginBottom:20 }}>提交上传</Button>
                    </Fragment>
                    <Table
                        style={{ marginBottom: 16 }}
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
