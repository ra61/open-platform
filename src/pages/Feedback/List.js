import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Badge, Table, Input  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';

const { Search } = Input;

const progressColumns = [
    {
        title: '工单编号',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '工单状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
            let node;
            switch (text) {
                case 0:
                    node = <Badge status="default" text="已创建" />
                    break;
                case 1:
                    node = <Badge status="processing" text="处理中" />
                    break;
                case 2:
                    node = <Badge status="success" text="已解决" />
                    break;
                case 3:
                    node = <Badge status="warning" text="已评价" />
                    break;
                default:
                    break;
            }

            return node;
        }
    },
    {
        title: '创建日期',
        dataIndex: 'time',
        sorter: true,
        key: 'time',
    },
    {
        title: '操作',
        render: (text, record) => (
            <Fragment>
                <Link to={'/feedback/detail?id=' + record.id} >
                    查看
                </Link>
            </Fragment>
        ),
    },
];

@connect(({ feedback, loading }) => ({
    feedback,
    loading: loading.effects['feedback/fetchList'],
}))
class List extends Component {

    state = {
        pageIndex: 1,
        pageSize: 5
    }

    componentDidMount() {
        const { dispatch } = this.props;

        let params = {
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
        }

        dispatch({
            type: 'feedback/fetchList',
            payload: params
        });
    }

    handleListChange = (pageIndex, pageSize) => {
        let params = {
            pageIndex: pageIndex,
            pageSize: pageSize,
        };

        this.setState({ pageIndex: pageIndex, pageSize: pageSize });

        this.props.dispatch({
            type: 'feedback/fetchList',
            payload: params,
        });
    };

    render() {
        const { feedback, loading } = this.props;
        const { feedbackList, totalCount } = feedback;

        const { pageSize } = this.state;

        const pageHeaderContent = (
            <div className={styles.pageHeaderTitle}>反馈列表</div>
        )

        const extraContent = (
            <div className={styles.extraContent}>
                <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
            </div>
        );

        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: false,
            pageSize: pageSize,
            total: totalCount,
            onChange: (pageIndex, pageSize) => {
                this.handleListChange(pageIndex, pageSize)
            },
            onShowSizeChange: (pageIndex, pageSize) => {
                this.handleListChange(pageIndex, pageSize)
            },
        };
        
        return (
            <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
                <Card bordered={false}>
                    <Table
                        style={{ marginBottom: 16 }}
                        pagination={paginationProps}
                        loading={loading}
                        dataSource={feedbackList}
                        columns={progressColumns}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default List;
