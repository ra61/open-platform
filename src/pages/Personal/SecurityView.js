import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List, Card} from 'antd';
import Link from 'umi/link';
import styles from './SecurityView.less';

// import { getTimeDistance } from '@/utils/utils';

const user = {
  password: '已设置',
  phone: 13456789023,
  email: '未绑定',
  wx: '未绑定'
}


class SecurityView extends Component {

  
  getData = () => [
    {
      title: '登录密码',
      value: user.password,
      description: '安全性高的密码可以使帐号更安全。建议您定期更换密码',
      actions: [
        <Link to={{ pathname: "/personal/modify-password"}} >
          <FormattedMessage id="personal.security.modify" defaultMessage="Modify" />
        </Link>
      ],
      required: true
    },
    {
      title: '联系手机',
      value: user.phone,
      description: '您的联系手机可以直接用于登录、找回密码等。',
      actions: [
        <Link to={{ pathname: "/personal/modify-phone"}} >
          <FormattedMessage id="personal.security.modify" defaultMessage="Modify" />
        </Link>
      ],
      required: true
    },
    {
      title: '联系邮箱',
      value: user.email,
      description: '您在灵云的联系邮箱未校验，不能用于业务的身份认证。',
      actions: [
        <Link to={{ pathname: "/personal/bind-email" }} >
          <FormattedMessage id="personal.security.bind" defaultMessage="Bind" />
        </Link>
      ],
      required: true
    },
    {
      title: '微信绑定',
      value: user.wx,
      description: '绑定微信之后可以在登陆的时候实现扫一扫快捷登录。',
      actions: [
        <Link to={{ pathname: "/personal/bind-weixin" }} >
          <FormattedMessage id="personal.security.bind" defaultMessage="Bind" />
        </Link>
      ],
    }
  ];

  render() {
    return (
      <Card title="安全信息">
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            // <List.Item actions={item.actions}>
            //   <List.Item.Meta title={item.title} description={item.description} />
            // </List.Item>
            
            <div className={styles.item}>
              <div className={styles.itemLeft}>
                {item.required ? (<span>*</span>):(' ')}
              {item.title} ：</div>
              <div className={styles.itemRight}>
                <div>
                  <span>{item.value}</span>
                  {item.actions}
                </div>
                <div>{item.description}</div>
              </div>
            </div>
            
          )}
        />
      </Card>
    );
  }
}

export default SecurityView;
