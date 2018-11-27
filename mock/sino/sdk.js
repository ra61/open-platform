
const SDKList = [
    {
        key: '1',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download:'下载',
        children:[
            {
                key: '12',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '13',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '14',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
        ]
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
        download:'下载'
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

const SDKInfo = [
    {
        key: '1',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载',
        children:[
            {
                key: '12',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '13',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '14',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
        ]
    },
    {
        key: '2',
        sdk: 'IOS版',
        content: '新增支持: 1. ABC',
        look: '查看',
        time: '2017-10-01 14:10',
        size: '5mins',
        download: '下载',
        children:[
            {
                key: '22',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '23',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
            {
                key: '24',
                sdk: 'IOS版',
                content: '新增支持: 1. ABC',
                look: '查看',
                time: '2017-10-01 14:10',
                size: '5mins',
                download: '下载'
            },
        ]
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


const getSDKList = {
    SDKList
};

const getSDKInfo = {
    SDKInfo
};

export default {
    'GET /api/sdk/list': getSDKList,
    'GET /api/sdk/info': getSDKInfo
};
