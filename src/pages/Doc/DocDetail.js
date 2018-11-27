import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Anchor, Card, Divider, Icon, message } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './DocDetail.less';

const { Link } = Anchor;

@connect(({ docDetail }) => ({
  docDetail
}))
class DocDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.query.id, // 文档ID
      anchorListData: [], // anchor列表数据
      needFixed: false, // 滚动之后固定
      up: 0,
      down: 0,
      next: undefined,
      pre: undefined,
      title: '',
      date: '',
      content: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // 请求数据
    dispatch({
      type: 'docDetail/fetchDocDetail',
      payload: {
        id: this.state.id,
      },
      callback: data => {
        this.setState({
          up: data.up,
          down: data.down,
          next: data.next,
          pre: data.pre,
          title: data.title,
          date: data.publish_time,
          content: data.content
        });
      },
    });

    this.setState({ anchorListData: this.getListData(document.getElementById('wrap')) });

    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  // 获取标题
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

  // 滚动
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

  // 点赞
  upDoc = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'docDetail/fetchUpDownDoc',
      payload: {
        action: 'up',
        id: this.state.id,
      },
      callback: response => {
        if (response.status == 'ok') {
          this.setState({
            up: response.up,
          });
          message.success('点赞成功');
        }

        if (response.status == 'error') {
          response.message && message.error(response.message);
        }
      },
    });
  };

  // 点踩
  downDoc = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'docDetail/fetchUpDownDoc',
      payload: {
        action: 'down',
        id: this.state.id,
      },
      callback: response => {
        if (response.status == 'ok') {
          this.setState({
            down: response.down,
          });
          message.success('点踩成功');
        }

        if (response.status == 'error') {
          response.message && message.error(response.message);
        }
      },
    });
  };

  // 跳转下一篇
  goDoc = id => {
    const { dispatch } = this.props;

    // 改变链接
    dispatch(
      routerRedux.push({
        pathname: '/doc/detail',
        search: 'id=' + id,
      })
    );

    // 请求数据
    dispatch({
      type: 'docDetail/fetchDocDetail',
      payload: {
        id: id,
      },
      callback: data => {
        this.setState({
          id: id,
          up: data.up,
          down: data.down,
          next: data.next,
          pre: data.pre,
          title: data.title,
          date: data.publish_time,
          content: data.content
        });
      },
    });
  };

  render() {
    const { docDetail } = this.props;
    const { up, down, next, pre, title, date, content } = this.state;

    const extraTitle = (
      <div className={styles.extraContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.info}>
          <Icon type="eye-o" /> <span>{up}</span> <Icon type="clock-circle-o" />{' '}
          <span>{date}</span>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper title={title}>
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
                  <div className={styles.icon} onClick={this.upDoc}>
                    <Icon type="like-o" />
                  </div>
                  <div>赞一个</div>
                </div>
                <div className={styles.trample}>
                  <div className={styles.icon} onClick={this.downDoc}>
                    <Icon type="dislike-o" />
                  </div>
                  <div>
                    {down}
                    个踩
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider style={{ margin: '24px 0' }} />
          {/* <div className={styles.moreDocu}>
            <div className={styles.leftDocu} >
              <Icon type="left" />
              {
                pre ? <span onClick={() => this.goDoc(pre.id)}>{pre.title}</span> : <span>没有了</span>
              }
              
            </div>
            <div className={styles.rightDocu} >
              {
                next ? <span onClick={() => this.goDoc(next.id)}>{next.title}</span> : <span>没有了</span>
              }
              <Icon type="right" />
            </div>
          </div> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DocDetail;
