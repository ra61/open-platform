import React, { Fragment } from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import bg from '../assets/bg.jpg';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 灵云开放平台社区
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>全方位人工智能开放平台</span>
              </Link>
            </div>
            <div className={styles.desc}>灵云官网</div>
          </div>
          <div className={styles.loginMain}>
            <div className={styles.left}>
              <div className={styles.topText}>灵智千企<em></em>云慧万户</div>
              <div className={styles.bottomText}>灵云全方位人工智能</div>
            </div>
            <div className={styles.right}>
              {children}
            </div>
          </div>
          
        </div>
        {/* <GlobalFooter links={links} copyright={copyright} /> */}
      </div>
    );
  }
}

export default UserLayout;
