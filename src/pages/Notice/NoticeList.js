import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, List, Tag, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './NoticeList.less';

const pageSize = 5;

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.list,
}))
class NoticeList extends Component {
  state = {
    pageIndex: 1,
    pageSize: 5,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    let params = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };

    dispatch({
      type: 'notice/fetch',
      payload: params,
    });
  }

  handleListChange = (pageIndex, pageSize) => {
    let params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };

    this.setState({ pageIndex: pageIndex, pageSize: pageSize });

    this.props.dispatch({
      type: 'notice/fetch',
      payload: params,
    });
  };

  render() {
    const {
      notice: { noticeData, totalCount },
      loading,
    } = this.props;

    const { pageSize } = this.state;

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSize: pageSize,
      total: totalCount,
      onChange: (pageIndex, pageSize) => {
        this.handleListChange(pageIndex, pageSize);
      },
      onShowSizeChange: (pageIndex, pageSize) => {
        this.handleListChange(pageIndex, pageSize);
      },
    };

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, date } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          发布于
          <em>{date}</em>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper title="通知公告">
        <Card
          style={{ marginTop: 24 }}
          bordered={true}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={noticeData.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            pagination={paginationProps}
            dataSource={noticeData}
            renderItem={item => (
              <List.Item key={item.id} extra={<div className={styles.listItemExtra} />}>
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NoticeList;
