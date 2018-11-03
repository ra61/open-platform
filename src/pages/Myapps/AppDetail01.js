import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Menu, Button, Icon } from 'antd';
import Link from 'umi/link';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './AppDetail.less';

const { Item } = Menu;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class AppDetail extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    const menuMap = {
      situation: <FormattedMessage id="myapps.detail.situation" defaultMessage="situation" />,
      // app: (
      //   <FormattedMessage id="myapps.detail.app" defaultMessage="app" />
      // ),
      ability: (
        <FormattedMessage id="myapps.detail.ability" defaultMessage="ability" />
      ),
      resource: (
        <FormattedMessage id="myapps.detail.resource" defaultMessage="resource" />
      ),
      terminal: (
        <FormattedMessage id="myapps.detail.terminal" defaultMessage="terminal" />
      ),
      business: (
        <FormattedMessage id="myapps.detail.business" defaultMessage="business" />
      ),
      stat: (
        <FormattedMessage id="myapps.detail.stat" defaultMessage="stat" />
      ),
    };
    const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: menuMap[key] ? key : 'base',
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    router.push(`/sino/myapps/detail/${key}`);
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    const pageHeaderContent = (
      <div className={styles.pageHeaderTitle}>应用A 
        <Link to="/sino/myapps/detail/app" >
          <Icon type="edit" theme="outlined" style={{ marginLeft: 10 }} />
        </Link>
      </div>
    )
    const extraContent = (<Button type="primary" htmlType="submit">申请商用</Button>)
    return (
      <PageHeaderWrapper content={pageHeaderContent} extraContent={extraContent}>
        
        <GridContent>
          <div
            className={styles.main}
            ref={ref => {
              this.main = ref;
            }}
          >
            <div className={styles.leftmenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                {this.getmenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
              {children}
            </div>
          </div>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default AppDetail;
