
const sourceFile = [
    {
        key: '1',
        capacity: 'IOS版',
        source: 'Barron',
        children:[
            {
                key: '12',
                capacity: 'IOS版',
                capkey: 'tts.local.synth',
                source: 'Barron'
            },
            {
                key: '13',
                capacity: 'IOS版',
                source: 'Barron',
                children: [
                    {
                        key: '132',
                        capacity: 'IOS版',
                        capkey: 'tts.local.synth',
                        source: 'Barron'
                    },
                    {
                        key: '133',
                        capacity: 'IOS版',
                        capkey: 'tts.local.synth',
                        source: 'Barron'
                    }
                ]
            }
        ]
    },
    {
        key: '2',
        capacity: 'IOS版',
        capkey: 'tts.local.synth',
        source: 'Barron',
        children: [
            {
                key: '22',
                capacity: 'IOS版',
                capkey: 'tts.local.synth',
                source: 'Barron'
            },
            {
                key: '23',
                capacity: 'IOS版',
                capkey: 'tts.local.synth',
                source: 'Barron'
            }
        ]
    },
    {
        key: '3',
        capacity: 'IOS版',
        capkey: 'tts.local.synth',
        source: 'Barron'
    },
    {
        key: '4',
        capacity: 'IOS版',
        capkey: 'tts.local.synth',
        source: 'Barron'
    },
    {
        key: '5',
        capacity: 'IOS版',
        capkey: 'tts.local.synth',
        source: 'Barron'
    }
    
];

const grammarFile = [
    {
        key: '1',
        grammarid:123456789,
        fileName: 'IOS版',
        type: '新增支持: 1. ABC',
        url: 'url://'
    },
    {
        key: '2',
        grammarid: 123456789,
        fileName: 'IOS版',
        type: '新增支持: 1. ABC',
        url: 'url://'
    },
    {
        key: '3',
        grammarid: 123456789,
        fileName: 'IOS版',
        type: '新增支持: 1. ABC',
        url: 'url://'
    },
    {
        key: '4',
        grammarid: 123456789,
        fileName: 'IOS版',
        type: '新增支持: 1. ABC',
        url: 'url://'
    },
    {
        key: '5',
        grammarid: 123456789,
        fileName: 'IOS版',
        type: '新增支持: 1. ABC',
        url: 'url://'
    }

];


const getSourceFile = {
    sourceFile
};

const getGrammarFile = {
    grammarFile
};

export default {
    'GET /api/source/file': getSourceFile,
    'GET /api/grammar/file': getGrammarFile
};
