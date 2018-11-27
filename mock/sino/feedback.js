
const feedbackList = [
    {
        key: '1',
        order: '123456',
        title: 'IOS版',
        status: 'pending',
        time: '2017-10-01 14:10',
        handle:'查看'
    },
    {
        key: '2',
        order: '123456',
        title: 'IOS版',
        status: 'being',
        time: '2017-10-02 14:10',
        handle: '查看'
    },
    {
        key: '3',
        order: '123456',
        title: 'IOS版',
        status: 'pending',
        time: '2017-10-03 14:10',
        handle: '查看'
    },
    {
        key: '4',
        order: '123456',
        title: 'IOS版',
        status: 'being',
        time: '2017-10-04 14:10',
        handle: '查看'
    },
    {
        key: '5',
        order: '123456',
        title: 'IOS版',
        status: 'pending',
        time: '2017-10-05 14:10',
        handle: '查看'
    }
    
];

const feedbackDetail = [
    {
        key: '1',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载'
    },
    {
        key: '2',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载'
    },
    {
        key: '3',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载'
    },
    {
        key: '4',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载'
    },
    {
        key: '5',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载'
    },

];


const getFeedbackList = {
    feedbackList
};

const getFeedbackDetail = {
    feedbackDetail
};

export default {
    'GET /api/feedback/list': getFeedbackList,
    'GET /api/feedback/detail': getFeedbackDetail
};
