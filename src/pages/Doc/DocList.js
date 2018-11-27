import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Card, List, Tag, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DocList.less';

@connect(({ docList, loading }) => ({
  docList,
  loading: loading.models.list,
}))
class DocuList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.query.id,
      pageIndex: 1,
      pageSize: 5,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let params = {
      classifyId: this.state.id,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
    };

    dispatch({
      type: 'docList/fetchDocList',
      payload: params,
    });
  }

  handleListChange = (pageIndex, pageSize) => {
    this.setState({ pageIndex: pageIndex, pageSize: pageSize });

    let params = {
      classifyId: this.state.id,
      pageIndex: pageIndex,
      pageSize: pageSize,
    };

    this.props.dispatch({
      type: 'docList/fetchDocList',
      payload: params,
    });
  };

  render() {
    const {
      docList: { documentList, totalCount, name },
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

    const ListContent = ({ data: { content, publish_time, up } }) => (
      <div className={styles.listContent}>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: content }}></div>
        <div className={styles.extra}>
          发布于
          <em style={{ marginRight: 10 }}>{moment(publish_time).format('YYYY-MM-DD HH:mm')}</em>
          <IconText type="like-o" text={up} />
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper title={name}>
        <Card
          style={{ marginTop: 24 }}
          bordered={true}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={documentList.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            pagination={paginationProps}
            dataSource={documentList}
            renderItem={item => (
              <List.Item key={item.id} extra={<div className={styles.listItemExtra} />}>
                <List.Item.Meta
                  title={
                    <Link to={'/doc/detail?id=' + item.id} className={styles.listItemMetaTitle}>
                      {item.title}
                    </Link>
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

export default DocuList;
