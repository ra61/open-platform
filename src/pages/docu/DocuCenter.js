import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Button, Icon, List } from 'antd';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DocuCenter.less';

@connect(({ docu, loading }) => ({
  docu,
  loading: loading.models.list,
}))
class DocuCenter extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'docu/fetch',
      payload: {
        count: 6,
      },
    });
  }

  render() {

    const {
      docu,
      loading,
    } = this.props;

    const { fileCenterList } = docu


    return (
      <PageHeaderWrapper title="文档中心">
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...fileCenterList]}
            renderItem={item =>
               (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card}  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a>{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.description}
                        </Ellipsis>
                      }
                    />
                    
                  </Card>
                  <ul>
                  {
                      item.article.map(element => (
                        <li key={element.id}>
                          <Link to={element.href}>
                            {element.title}
                          </Link>
                        
                        </li>
                      ))
                  }
                  </ul>
                  
                </List.Item>
              ) 
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default DocuCenter;
