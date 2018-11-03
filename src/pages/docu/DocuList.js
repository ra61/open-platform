import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, List, Tag, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './DocuList.less';

const pageSize = 5;

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class DocuList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const {
      form,
      list: { list },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    const dataSource = [
      {
        id:1,
        title:'Ant',
        href:'',
        tags: ['应用教程','产品说明','随便写的'],
        content: 'sflsjfslfs',
        updatedAt: new Date(),
        like: '456'
      }
    ]

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, like} }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          发布于
          <em style={{ marginRight: 10 }}>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
          <IconText type="like-o" text={like} />
        </div>
      </div>
    );

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    return (
      <PageHeaderWrapper title='社区使用'>
        
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item
                key={item.id}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    
                    <span>
                      {
                        item.tags.map((itemTag, i) => (
                          <Tag key={i}>{itemTag}</Tag>
                        ))
                      }
                    </span>
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
