import React, { PureComponent } from 'react';
import { Anchor, Card, Divider, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DocuDetail.less';

const { Link } = Anchor;

class DocuDetail extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    this.setState({ anchorListData: this.getListData(document.getElementById('wrap')) });

    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  state = {
    anchorListData: [], // anchor列表数据
    needFixed: false, // 滚动之后固定
  };

  getListData = html => {
    let listData = [];
    let H1List = html.getElementsByTagName('h1');

    for (let i = 0; i < H1List.length; i++) {
      let title = H1List[i].innerHTML;
      let id = 'h1' + i;
      H1List[i].id = id;
      listData.push({ id: '#' + id, title: title });
    }

    return listData;
  };

  handScroll = () => {
    const { needFixed } = this.state;
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    requestAnimationFrame(() => {
      if (scrollTop > 200 && !needFixed) {
        this.setState({
          needFixed: true,
        });
      }
      if (scrollTop < 200 && needFixed) {
        this.setState({
          needFixed: false,
        });
      }
    });
  };

  render() {
    const docuData = {
      title: '文档详情',
      date: '2017-1-12 12:12',
      praiseCount: 200,
      trampleCount: 25,
      prevTitle: 'Antdesign设计语言',
      prevUrl: '',
      nextTitle: '色彩应用',
      nextUrl: '',
    };

    const extraTitle = (
      <div className={styles.extraContent}>
        <div className={styles.title}>{docuData.title}</div>
        <div className={styles.info}>
          <Icon type="eye-o" /> <span>{docuData.praiseCount}</span> <Icon type="clock-circle-o" />{' '}
          <span>{docuData.date}</span>
        </div>
      </div>
    );

    const content =
      '<h1>标题1</h1></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br><h1>标题2</h1></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br><h1>标题3</h1></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>';

    return (
      <PageHeaderWrapper title={docuData.title}>
        <Card title={extraTitle} style={{ position: 'relative', paddingRight: 330 }}>
          <Anchor
            getContainer={() => document.getElementById('wrap')}
            affix={true}
            className={this.state.needFixed ? styles.anachor_fixed : styles.anachor_absolute}
          >
            {this.state.anchorListData.map((item, i) => (
              <Link href={item.id} title={item.title} key={i} />
            ))}
          </Anchor>

          <div id="wrap" dangerouslySetInnerHTML={{ __html: content }} />

          <div className={styles.evaluate}>
            <div>
              <div className={styles.title}>你认为本篇文章有用吗?</div>
              <div className={styles.action}>
                <div className={styles.praise}>
                  <div className={styles.icon}>
                    <Icon type="like-o" />
                  </div>
                  <div>赞一个</div>
                </div>
                <div className={styles.trample}>
                  <div className={styles.icon}>
                    <Icon type="dislike-o" />
                  </div>
                  <div>
                    {docuData.trampleCount}
                    个踩
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider style={{ margin: '24px 0' }} />
          <div className={styles.moreDocu}>
            <div className={styles.leftDocu}>
              <Icon type="left" />
              <span>{docuData.prevTitle}</span>
            </div>
            <div className={styles.rightDocu}>
              <span>{docuData.nextTitle}</span>
              <Icon type="right" />
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DocuDetail;
