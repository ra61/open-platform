
const appList = [
    {
        id:'app001',
        name:'应用A',
        href:'',
        logo:'',
        authType: '测试授权',
        status:'1',
        subDescription:'11234'
    },
    {
        id: 'app002',
        name: '应用B',
        href: '',
        logo: '2',
        authType: '测试授权',
        status: '2',
        subDescription: 'eqeqeqeqe'
    },
    {
        id: 'app003',
        name: '应用C',
        href: '',
        logo: '',
        authType: '商用授权',
        status: '0',
        subDescription: 'eqeqeqrtfg'
    },
    {
        id: 'app004',
        name: '应用D',
        href: '',
        logo: '',
        authType: '测试授权',
        status:'1',
        subDescription: 'sfshgjheg'
    },
    {
        id: 'app005',
        name: '应用E',
        href: '',
        logo: '',
        authType: '商用授权',
        status: '2',
        subDescription: 'ddfhsdgdgd'
    },
    {
        id: 'app006',
        name: '应用F',
        href: '',
        logo: '',
        authType: '测试授权',
        status: '1',
        subDescription: '11234'
    },
    {
        id: 'app007',
        name: '应用G',
        href: '',
        logo: '2',
        authType: '测试授权',
        status: '2',
        subDescription: 'eqeqeqeqe'
    },
    {
        id: 'app008',
        name: '应用G',
        href: '',
        logo: '',
        authType: '商用授权',
        status: '0',
        subDescription: 'eqeqeqrtfg'
    },
    {
        id: 'app009',
        name: '应用I',
        href: '',
        logo: '',
        authType: '测试授权',
        status: '1',
        subDescription: 'sfshgjheg'
    },
    {
        id: 'app010',
        name: '应用J',
        href: '',
        logo: '',
        authType: '商用授权',
        status: '2',
        subDescription: 'ddfhsdgdgd'
    }
];




const getAppList = {
    appList
};

export default {
    'GET /api/app/list': getAppList
};
