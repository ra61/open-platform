export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
      {
        path: '/user/back-phone',
        name: 'backPhone',
        component: './User/BackPhone',
        hideInMenu: true,
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/user/back-phone',
            name: 'backPhone',
            redirect: '/user/back-phone/info',
          },
          {
            path: '/user/back-phone/info',
            name: 'info',
            component: './User/BackPhone/Step1',
          },
          {
            path: '/user/back-phone/confirm',
            name: 'confirm',
            component: './User/BackPhone/Step2',
          },
          {
            path: '/user/back-phone/result',
            name: 'result',
            component: './User/BackPhone/Step3',
          },
        ],
      },
      {
        path: '/user/back-email',
        name: 'backEmail',
        component: './User/BackEmail',
        hideInMenu: true,
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/user/back-email',
            name: 'backEmail',
            redirect: '/user/back-email/info',
          },
          {
            path: '/user/back-email/info',
            name: 'info',
            component: './User/BackEmail/Step1',
          },
          {
            path: '/user/back-email/confirm',
            name: 'confirm',
            component: './User/BackEmail/Step2',
          },
          {
            path: '/user/back-email/result',
            name: 'result',
            component: './User/BackEmail/Step3',
          },
        ],
      },
    ],
  },
  // sino
  {
    path: '/',
    component: '../layouts/BlankLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/panel' },
      { path: '/dashboard', redirect: '/dashboard/panel' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/dashboard/panel',
            name: 'analysis',
            component: './Dashboard/Panel',
          },
        ],
      },
      { path: '/myapps', redirect: '/myapps/list' },
      {
        path: '/myapps',
        name: 'myapps',
        icon: 'profile',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/myapps/list',
            name: 'list',
            component: './Myapps/AppList',
          },
          {
            path: '/myapps/detail',
            name: 'detail',
            component: './Myapps/AppDetail',
            hideInMenu: true,
            routes: [
              {
                path: '/myapps/detail',
                redirect: '/myapps/detail/situation',
              },
              {
                path: '/myapps/detail/situation',
                component: './Myapps/Detail/Situation',
              },
              {
                path: '/myapps/detail/app',
                component: './Myapps/Detail/ModifyApp',
              },
              {
                path: '/myapps/detail/resource',
                component: './Myapps/Detail/Resource',
              },
              {
                path: '/myapps/detail/ability',
                component: './Myapps/Detail/ModifyAbility',
              },
              {
                path: '/myapps/detail/terminal',
                component: './Myapps/Detail/Terminal',
              },
              {
                path: '/myapps/detail/business',
                component: './Myapps/Detail/Business',
              },
              {
                path: '/myapps/detail/stat',
                component: './Myapps/Detail/Stat',
              },
            ],
          },
        ],
      },
      {
        path: '/createApp',
        name: 'createApp',
        icon: 'appstore',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/createApp',
            redirect: '/createApp/basicInfo',
          },
          {
            path: '/createApp/basicInfo',
            name: 'basicInfo',
            component: './CreateApp/BasicInfo',
          },
          {
            path: '/createApp/backInfo',
            name: 'backInfo',
            component: './CreateApp/BackInfo',
          },
        ],
      },
      {
        path: '/sdk',
        name: 'sdk',
        icon: 'download',
        routes: [
          {
            path: '/sdk/list',
            name: 'list',
            component: './Sdk/List',
          },
          {
            path: '/sdk/info',
            name: 'info',
            component: './Sdk/Info',
          },
        ],
      },
      {
        path: '/docu',
        name: 'docu',
        icon: 'file-text',
        routes: [
          {
            path: '/docu/center',
            name: 'center',
            component: './Docu/DocuCenter',
          },
          {
            path: '/docu/list',
            name: 'list',
            component: './Docu/DocuList',
          },
          {
            path: '/docu/detail',
            name: 'detail',
            component: './Docu/DocuDetail',
          },
        ],
      },
      {
        path: '/feedback',
        name: 'feedback',
        icon: 'form',
        routes: [
          {
            path: '/feedback/list',
            name: 'list',
            component: './Feedback/List',
          },
          {
            path: '/feedback/detail',
            name: 'detail',
            component: './Feedback/Detail',
          },
        ],
      },
      {
        path: '/personal',
        name: 'personal',
        hideInMenu: true,
        component: './Personal/Base',
        routes: [
          {
            path: '/personal',
            redirect: '/personal/baseInfo',
          },
          {
            path: '/personal/baseInfo',
            component: './Personal/BaseInfo',
          },
          {
            path: '/personal/security',
            component: './Personal/SecurityView',
          },
          {
            path: '/personal/modify-password',
            component: './Personal/ModifyPassword',
          },
          {
            path: '/personal/modify-phone',
            name: 'modifyPhone',
            component: './Personal/StepPhone',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/personal/modify-phone',
                name: 'stepPhone',
                redirect: '/personal/modify-phone/info',
              },
              {
                path: '/personal/modify-phone/info',
                name: 'info',
                component: './Personal/StepPhone/Step1',
              },
              {
                path: '/personal/modify-phone/confirm',
                name: 'confirm',
                component: './Personal/StepPhone/Step2',
              },
              {
                path: '/personal/modify-phone/result',
                name: 'result',
                component: './Personal/StepPhone/Step3',
              },
            ],
          },
          {
            path: '/personal/bind-email',
            name: 'bindEmail',
            component: './Personal/StepEmail',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/personal/bind-email',
                name: 'stepEmail',
                redirect: '/personal/bind-email/info',
              },
              {
                path: '/personal/bind-email/info',
                name: 'info',
                component: './Personal/StepEmail/Step1',
              },
              {
                path: '/personal/bind-email/confirm',
                name: 'confirm',
                component: './Personal/StepEmail/Step2',
              },
              {
                path: '/personal/bind-email/result',
                name: 'result',
                component: './Personal/StepEmail/Step3',
              },
            ],
          },
          {
            path: '/personal/bind-weixin',
            name: 'bindWeiXin',
            component: './Personal/StepWeiXin',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/personal/bind-weixin',
                name: 'stepWeiXin',
                redirect: '/personal/bind-weixin/info',
              },
              {
                path: '/personal/bind-weixin/info',
                name: 'info',
                component: './Personal/StepWeiXin/Step1',
              },
              {
                path: '/personal/bind-weixin/confirm',
                name: 'confirm',
                component: './Personal/StepWeiXin/Step2',
              },
              {
                path: '/personal/bind-weixin/result',
                name: 'result',
                component: './Personal/StepWeiXin/Step3',
              },
            ],
          },
        ],
      },
      {
        path: '/notice',
        name: 'notice',
        icon: 'file-text',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/notice',
            redirect: '/notice/list',
          },
          {
            path: '/notice/list',
            name: 'list',
            component: './Notice/NoticeList',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
    ],
  },
];
