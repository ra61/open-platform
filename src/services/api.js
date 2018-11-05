import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  let body = new FormData();

  body.append('userName', params.userName);
  body.append('password', params.password);
  body.append('remember', 'on');

  return request('/api2/dev/Appdeveloper/doAjaxLogin', {
    method: 'POST',
    body: body,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// sino API

export async function queryPanelData() {
  return request('/api/dashboard/panelData');
}

export async function queryRankingData(params) {
  return request('/api2/dev/statistics/getAppRanking', {
    method: 'POST',
    body: params,
  });
}

export async function queryDailyStatisticData() {
  return request('/api2/dev/statistics/getDailyStatistic');
}

export async function queryAbilityStatisticData() {
  return request('/api2/dev/statistics/getAbilityStatistic');
}

export async function queryPhpData() {
  let result = request('/api2/dev/statistics/getAppWarningInfo');
  return result;
}

export async function mockLogin() {
  let params = new FormData();

  params.append('account', '15912341234');
  params.append('password', '111111aa');
  params.append('remember', 'on');

  let result = request('/api2/dev/appdeveloper/doLogin', {
    method: 'POST',
    body: params,
  });

  // /dev/appdeveloper/doLogin
  // account: 15912341234
  // password: 111111aa
  // remember: on

  return result;
}

// 应用列表

export async function queryAppList(params) {
  let formData = new FormData();
  formData.append('pageIndex', params.pageIndex);
  formData.append('pageSize', params.pageSize);

  return request('/api2/dev/application/getAppList', {
    method: 'POST',
    body: formData,
    expirys: false
  });

}

// 应用基本信息
export async function queryAppBasicInfo(params) {
  let body = new FormData();
  body.append('appId', params.appId);

  return request('/api2/dev/application/getAppBasicInfo', {
    method: 'POST',
    body: body,
  });
}

// 概况
export async function querySituationAllData() {
  return request('/api/situation/allData');
}

export async function querySituationApp(params) {
  return request(`/api/situation/app?id=${params}`);
}

export async function querySituationCalledData() {
  return request('/api/situation/calledData');
}

// 创建应用
export async function submitCreateNewApp(params) {
  let body = new FormData();
  body.append('appname', params.appname);
  body.append('category', params.category);
  body.append('summary', params.summary);
  body.append('os', params.os);
  body.append('ability', params.ability);

  return request('/api2/dev/application/createNewApp', {
    method: 'POST',
    body: body,
  });
}

// sdk
export async function querySDKVersionList() {
  return request('/api2/dev/sdk/getSdkVersionList');
}

export async function querySDKList(params) {

  let body = new FormData();
  body.append('version', params.version);

  return request('/api2/dev/sdk/getSdkList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

export async function querySDKInfo() {

  return request('/api2/dev/sdk/getExtSdkList');
}

// 文档中心
export async function queryFileCenterList() {
  return request('/api2/dev/document/getDocSummary');
}

export async function queryDocumentList(params) {

  console.log(params)
  let body = new FormData();
  body.append('classifyId', params.classifyId);
  body.append('pageIndex', params.pageIndex);
  body.append('pageSize', params.pageSize);
  return request('/api2/dev/document/getDocList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}


export async function queryNoticeList(params) {
  let body = new FormData();
  body.append('pageIndex', params.pageIndex);
  body.append('pageSize', params.pageSize);

  return request('/api2/dev/document/getNoticeList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 意见反馈
export async function addFeedback(params) {

  let body = new FormData();
  body.append('type', params.type);
  body.append('title', params.title);
  body.append('content', params.content);
  body.append('contact', params.contact);

  return request('/api2/dev/WorkOrder/ajaxCreateWorkOrder', {
    method: 'POST',
    body: body,
    expirys: false
  });

  // return request('/api/feedback/list');
}

export async function queryFeedbackList(params) {
  let body = new FormData();
  body.append('pageIndex', params.pageIndex);
  body.append('pageSize', params.pageSize);

  return request('/api2/dev/WorkOrder/getWorkOrderList', {
    method: 'POST',
    body: body,
    expirys: false
  });

  // return request('/api/feedback/list');
}

export async function queryFeedbackDetail() {
  return request('/api/feedback/detail');
}

// 应用详情-资源文件
export async function querySourceFile() {
  return request('/api/source/file');
}

export async function queryGrammarFile() {
  return request('/api/grammar/file');
}
