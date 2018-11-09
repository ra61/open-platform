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

export async function queryNoticeData() {
  return request('/api2/dev/statistics/getNoticeList');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// sino API

// 应用排行
export async function getAppRanking(params) {
  let body = new FormData();
  body.append('startDate', params.startDate);
  body.append('endDate', params.endDate);
  return request('/api2/dev/statistics/getAppRanking', {
    method: 'POST',
    body: body,
  });
}

// 今日统计
export async function getDailyStatistic() {
  return request('/api2/dev/statistics/getDailyStatistic');
}

// 今日调用
export async function getAbilityStatistic() {
  return request('/api2/dev/statistics/getAbilityStatistic');
}

// 预警
export async function getAppWarning() {
  let result = request('/api2/dev/statistics/getAppWarningInfo');
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

// 获取应用基本信息
export async function queryAppBasicInfo(params) {
  let body = new FormData();
  body.append('appId', params.appId);

  return request('/api2/dev/application/getAppBasicInfo', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 更新应用基本信息
export async function updateAppBasicInfo(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  body.append('appname', params.appname);
  body.append('category', params.category);
  body.append('summary', params.summary);
  body.append('os', params.os);

  return request('/api2/dev/application/updateAppBasicInfo', {
    method: 'POST',
    body: body,
    expirys: false
  });
}



// 概况

// 统计信息
export async function getAppStatisticByAppId(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  return request('/api2/dev/application/getAppStatisticByAppId', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 版本列表
export async function getAppSerialList(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  return request('/api2/dev/application/getAppSerialList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}


// 调用统计
export async function getAppAbilityStByAppId(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  body.append('startDate', params.startDate);
  body.append('endDate', params.endDate);
  return request('/api2/dev/application/getAppAbilityStByAppId', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 统计分析

export async function getDailyStatisticById(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  return request('/api2/dev/statistics/getDailyStatistic', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 能力统计
export async function getAppAbilityClassifyStByAppId(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  body.append('startDate', params.startDate);
  body.append('endDate', params.endDate);
  return request('/api2/dev/application/getAppAbilityClassifyStByAppId', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 终端统计
export async function getAppTerminalStByAppId(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  body.append('startDate', params.startDate);
  body.append('endDate', params.endDate);
  return request('/api2/dev/application/getAppTerminalStByAppId', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 授权信息
export async function getAppInfoByAppkey(params) {
  let body = new FormData();
  body.append('appKey', params.appKey);
  return request('/api2/dev/application/getAppInfoByAppkey', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 打包下载终端设备信息
export async function downloadUdidList(params) {
  let body = new FormData();
  body.append('appId', params.appId);
  return request('/api2/dev/application/downloadUdidList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 获取能力列表
export async function getCapkeyList(params) {
  let body = new FormData();
  body.append('appKey', params.appKey);
  return request('/api2/dev/application/getCapkeyList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 获取资源文件版本列表
export async function getResourceVersionList(params) {
  let body = new FormData();
  body.append('appKey', params.appKey);
  return request('/api2/dev/application/getResourceVersionList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 获取资源文件
export async function getResourceList(params) {
  let body = new FormData();
  body.append('appKey', params.appKey);
  body.append('version', params.version);
  return request('/api2/dev/application/getResourceList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 获取语法文件
export async function getGrammarFile(params) {
  let body = new FormData();
  body.append('pageIndex', params.pageIndex);
  body.append('pageSize', params.pageSize);
  return request('/api2/dev/grammar/ajaxGetList', {
    method: 'POST',
    body: body,
    expirys: false
  });
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
    expirys: false
  });
}

// sdk版本
export async function querySDKVersionList() {
  return request('/api2/dev/sdk/getSdkVersionList');
}

// SDK列表
export async function querySDKList(params) {

  let body = new FormData();
  body.append('version', params.version);

  return request('/api2/dev/sdk/getSdkList', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 拓展控件
export async function querySDKInfo() {
  return request('/api2/dev/sdk/getExtSdkList');
}

// 文档中心
export async function getDocSummary() {
  return request('/api2/dev/document/getDocSummary');
}

// 文档列表
export async function getDocList(params) {

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

// 文档详情
export async function getDocDetail(params) {
  let body = new FormData();
  body.append('id', params.id);
  return request('/api2/dev/document/getDocDetail', {
    method: 'POST',
    body: body,
    expirys: false
  });
}

// 点赞或踩
export async function upDownDoc(params) {
  let body = new FormData();
  body.append('action', params.action);
  body.append('id', params.id);
  return request('/api2/dev/document/ajaxUpDownDoc', {
    method: 'POST',
    body: body,
    expirys: false
  });
}



// 公告列表
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

// 反馈列表
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

// 反馈详情
export async function queryFeedbackDetail(params) {

  let body = new FormData();
  body.append('id', params.id);

  return request('/api2/dev/WorkOrder/getWorkOrderInfo', {
    method: 'POST',
    body: body,
    expirys: false
  });

}

// 回复反馈
export async function queryDialogList(params) {

  let body = new FormData();
  body.append('id', params.id);

  return request('/api2/dev/WorkOrder/getInteractionList', {
    method: 'POST',
    body: body,
    expirys: false
  });

}



// 应用详情-资源文件
export async function querySourceFile() {
  return request('/api/source/file');
}

export async function queryGrammarFile() {
  return request('/api/grammar/file');
}

// 用户基本信息
export async function getDeveloperInfo() {
  return request('/api2/dev/Appdeveloper/ajaxGetDeveloperInfo');
}