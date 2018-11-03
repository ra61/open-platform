const headerData = {
    cumulativeTerminal:123456,
    remainingTerminal: 174255,
    cumulativePoints: 1223785,
    remainingPoints:741852
}

const authpriv = {
    appKey: 123485526464646464,
    devKey: 464166464133164646,
    address:164646464646461131,
    status: 4546464134646,
    number: 1316464,
    points: 4646464,
    date: '2018/09/21',
    type: 'show'
}

const calledData = [];
for (let i = 0; i < 12; i += 1) {
    calledData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

const getAllData = {
    calledData,
    headerData,
    authpriv
};

const getCalledData = {
    calledData
}

function getAppData(req, res){
    // let json;

    // if (req.query.id == 'app00l'){
    //     json = res.json(getAllData);
    // } else {
    //     json = res.json({ headerData01, calledData, authpriv01});
    // }
    // return json;
    // console.log(req.query.id, req.query.id == 'app00l')
    return res.json({
        headerData : {
            cumulativeTerminal: 1000000,
            remainingTerminal: 174255,
            cumulativePoints: 1223785,
            remainingPoints: 741852
        },
        authpriv : {
            appKey: 123485526464646464,
            devKey: 464166464133164646,
            address: 164646464646461131,
            status: 4546464134646,
            number: 1316464,
            points: 4646464,
            date: '2018/09/21',
            type: 'show'
        },
        calledData

    })
}


export default {
    'GET /api/situation/allData': getAllData,
    'GET /api/situation/app': getAppData,
    'GET /api/situation/calledData': getCalledData,
};