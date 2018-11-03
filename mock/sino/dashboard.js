// mock data
const rankingBarData = [];
for (let i = 0; i < 12; i += 1) {
    rankingBarData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `应用${i}`,
        total: 323234,
    });
}

const pieData = [
    {
        x: '语音合成',
        y: 4544,
    },
    {
        x: '语音识别',
        y: 3321,
    },
    {
        x: '文字识别',
        y: 3113,
    },
    {
        x: '手写识别',
        y: 2341,
    },
    {
        x: '语义理解',
        y: 1231,
    },
    {
        x: '机器翻译',
        y: 1231,
    },
    {
        x: '人脸识别',
        y: 1231,
    },
    {
        x: '声纹识别',
        y: 1231,
    },
];

const warningData = [
    { key: '1', title: '终端数量不足', value: 123456 },
    { key: '2', title: '授权即将到期', value: 123456 },
    { key: '3', title: '点数不足预警', value: 123456 },
];

const statisticsData = [{
    key: '1',
    logo: '',
    total: '1234',
    title: '新增终端'
}, {
    key: '2',
    logo: '',
    total: '1234',
    title: '调用'
},
{
    key: '3',
    logo: '',
    total: '1234',
    title: '消费点数'
},
{
    key: '4',
    logo: '',
    total: '1234',
    title: '流量'
}];

const noticeData = [
    {
        key: '1',
        title: '8月30日ASR引擎升级common领域',
        type: '升级'
    },
    {
        key: '2',
        title: '8月26日TTS挂接ABC音库',
        type: '升级'
    },
    {
        key: '3',
        title: '',
        type: '升级'
    }
]

const queryPanelData = {
    pieData,
    warningData,
    statisticsData,
    noticeData
};

const queryRankingData = {
    rankingBarData,
    rankingListData
}


export default {
    'GET /api/dashboard/panelData': queryPanelData,
    'GET /api/dashboard/rankingData': queryRankingData,
};
