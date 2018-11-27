import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Button, Icon, List } from 'antd';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DocCenter.less';

@connect(({ docCenter, loading }) => ({
  docCenter,
  loading: loading.models.list,
}))
class DocCenter extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'docCenter/fetchDocSummary',
    });
  }

  render() {
    const { docCenter, loading } = this.props;

    const { fileCenterList } = docCenter;

    return (
      <PageHeaderWrapper title="文档中心">
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={fileCenterList}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}>
                  <Card.Meta
                    avatar={<img alt="logo" className={styles.cardAvatar} src={item.avatar} />}
                    title={<Link to={'/doc/list?id=' + item.id}>{item.title}</Link>}
                    description={
                      <Ellipsis className={styles.item} lines={3}>
                        {item.description}
                      </Ellipsis>
                    }
                  />
                </Card>

                <ul style={{ minHeight: 131 }} className={styles.cardBorder}>
                  {item &&
                    item.article &&
                    item.article.map(element => (
                      <li key={element.id}>
                      <Link to={'/doc/detail?id=' + element.id} style={{ color: '#0066FF' }}>{element.title}</Link>
                      </li>
                    ))}
                </ul>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DocCenter;
