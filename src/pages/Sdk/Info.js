import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Icon  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { removeFromArray } from '@/utils/common';
import styles from './Info.less';

const progressColumns = [
    {
        title: '控件/应用',
        dataIndex: 'sdk',
        key: 'sdk',
    },
    {
        title: '介绍',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: '更新日期',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: '下载',
        dataIndex: 'download',
        key: 'download',
    },
];

@connect(({ sdk, loading }) => ({
    sdk,
    loading: loading.effects['sdk/fetchInfo'],
}))
class Info extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'sdk/fetchInfo'
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
        const { sdk, loading } = this.props;
        const { uiList } = sdk;

        return (
            <PageHeaderWrapper title="拓展控件" content="灵云UI控件和灵云智能空间能帮助开发者快速接入体验灵云能力">
                <Card bordered={false}>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={false}
                        loading={loading}
                        dataSource={uiList}
                        columns={progressColumns}
                        expandedRowKeys={this.state.expandedRows}
                        onExpand={this.handleOnExpand.bind(this)}
                    />
                    <div style={{ marginTop: 15 }}>
                        <Button type="primary" onClick={() => this.allExpand(uiList)}><Icon type="down-circle" />展开</Button>
                        <Button type="primary" onClick={this.allContract} style={{ marginLeft: 20 }}><Icon type="up-circle" />收缩</Button>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Info;
