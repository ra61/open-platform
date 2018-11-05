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
      type: 'docu/fetchFileCenterList'
    });
  }

  render() {

    const {
      docu,
      loading,
    } = this.props;

    const { fileCenterList } = docu

    const fileList= [
      { 
        "id": 1, 
        "title": "\u8bed\u97f3\u5408\u6210", 
        "avatar": "http:\/\/www.hcicloud.com:8889\/web\/img\/doc_classify\/1541061749_5bdac354b1f02.jpg",
         "description": "\u8bed\u97f3\u5408\u6210", 
         "article": [
           { "id": 1, "title": "ASR, \u4f60\u597d", "href": 'null' }, 
           { "id": 2, "title": "ASR\u4f7f\u7528\u6559\u7a0b", "href": 'null' }, 
           { "id": 3, "title": "ASR\u540c\u6b65\u53d1\u5e03u", "href": 'null' },
          { "id": 4, "title": "\u540c\u6b65\u53d1\u5e03", "href": 'null' }
        ] 
      }
      
    ] ;

    return (
      <PageHeaderWrapper title="文档中心">
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={fileList}
            renderItem={item =>
               (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card}  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={
                        <Link to={'/docu/list?id=' + item.id}>
                          {item.title}
                        </Link>
                      }
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
                          <Link to={'/docu/detail?id=' + element.id}>
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
