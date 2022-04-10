const sequelize = require('sequelize');
const Op = sequelize.Op;
const db = require('../../models');
const { Buy } = require('../../models');
const { Product } = require('../../models');

async function getBuyCounts(req, res) {
    const userKey = req.body.USER_KEY;
    try{
        const wait = await Buy.count({
        where: { BUY_BUYER_KEY: userKey, BUY_STATUS: {[Op.or]:['0', '2']} },
        });

        const progress = await Buy.count({
        where: { BUY_BUYER_KEY: userKey, BUY_STATUS: '3' },
        });

        const done = await Buy.count({
            where: { 
                BUY_BUYER_KEY: userKey, 
                BUY_STATUS: {[Op.or]:['1', '4']},
            },
        });

        buyCounts = [wait, progress, done]
        console.log("buyCount has been responsed from db : ", buyCounts);
        res.json(buyCounts);
    }catch(err){
        console.log(err);
    }
}

async function getWaitBuyListCount(req, res) {
    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const state = req.body.state; 

    await Buy.count({
        where:{
            BUY_BUYER_KEY: userKey,
            BUY_STATUS: getWaitStatusCondition(state),
            BUY_SDATE: {[Op.between]: [startDate, endDate]}
        }
    })
    .then((result) => {
        console.log("getWaitBuyListCount has been responsed from db : ",result);
        res.json(result);
    })
    .catch((err) => console.log(err))
}

function getWaitStatusCondition(state)
{
    switch(state){
        case 1:{
            return '0';
        }
        case 2:{
            return '2';
        }
        default:{
            return {[Op.or]:['0', '2']};
        }
    }
}

async function getWaitBuyList(req, res) {
    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const start = req.body.limitStart;
    const count = req.body.limitCount;
    const state = req.body.state; 
    const orderColumn = req.body.orderColumn;
    const orderDir = req.body.orderDir;
    
    await Buy.findAll({
        where:{
            BUY_BUYER_KEY: userKey,
            BUY_STATUS: getWaitStatusCondition(state),
            BUY_SDATE: {[Op.between]: [startDate, endDate]}
        },
        include:{
            model:Product,
            attributes: ['PRODUCT_NAME', 'PRODUCT_BRAND', 'PRODUCT_PIC'],
        },
        limit:[start, count],
        order:getSeqOrderCondition(orderColumn, orderDir),
    })
    .then((result) => {
        console.log("getWaitBuyList has been responsed from db : ",result);
        res.json(result);
    })
    .catch((err) => console.log(err));
}

function getSeqOrderCondition(orderColumn, orderDir)
{
    if(orderColumn.length == 0)
        return "";
    else
        return [[orderColumn, orderDir]]
}

async function getProgressBuyListCount(req, res) {
    
    const state = req.body.state;
    if(IsReturnEmpty(state))
    {
        res.json(0);
        return;
    }

    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const query = `
    SELECT COUNT(*)
    FROM Buy AS b
    JOIN Product AS p ON b.PRODUCT_KEY = p.PRODUCT_KEY
    WHERE b.BUY_BUYER_KEY = ${userKey} AND b.BUY_STATUS = 3 AND b.BUY_EDATE BETWEEN '${startDate}' AND '${endDate}'
    ${ getProgressStatusCondition(state) } ;`;

    await db.sequelize.query(query , { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
        console.log("getProgressBuyListCount has been responsed from db : ",result);
        res.json(result[0]["COUNT(*)"]);;
    })
    .catch((err) => console.log(err))
}


function getProgressStatusCondition(state)
{
    //slotStates:["전체", "대기 중", "발송완료", "입고대기", "입고완료", "검수 중", "검수보류","검수합격", "배송 중", "거래실패"],
    switch(state){
        //입고완료
        case 4:
            return "AND (Select i.INSPECTION_STATUS from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) IS NULL";
        //검수중
        case 5:{
            return "AND (Select i.INSPECTION_STATUS from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) = 0";
        }
        //불합격
        case 6:{
            return `AND (Select i.INSPECTION_STATUS from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) = 1
                    AND (Select i.INSPECTION_RESULT from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) = 0`;
        }
        //합격
        case 7:{
            return `AND (Select i.INSPECTION_STATUS from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) = 1
                    AND (Select i.INSPECTION_RESULT from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) = 1`;
        }
        //전체
        default:{
            return "";
        }
    }
}

function IsReturnEmpty(state)
{
    if(state == 0 || state == 4 || state == 5 || state == 6 || state == 7)
        return false;
        
    return true;
}

async function getProgressBuyList(req, res) {
    const state = req.body.state;
    if(IsReturnEmpty(state))
    {
        res.json([]);
        return;
    }

    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const start = req.body.limitStart;
    const count = req.body.limitCount;
    //const orderColumn = req.body.orderColumn;
    const orderDir = req.body.orderDir;
    
    const query = `
    SELECT
        b.BUY_KEY	
        ,b.PRODUCT_KEY	
        ,b.BUY_BUYER_KEY	
        ,b.BUY_PRICE	
        ,b.BUY_SDATE	
        ,b.BUY_EDATE	
        ,b.BUY_STATUS	
        ,b.BUY_SELLER_KEY
        ,p.PRODUCT_CATE
        ,p.PRODUCT_BRAND
        ,p.PRODUCT_NAME
        ,p.PRODUCT_PIC
        ,p.PRODUCT_DESC
        ,(Select i.INSPECTION_DATE from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) AS INSPECTION_DATE
        ,(Select i.INSPECTION_STATUS from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) AS INSPECTION_STATUS
        ,(Select i.INSPECTION_RESULT from Inspection AS i where b.BUY_SELLER_KEY = i.USER_KEY AND b.PRODUCT_KEY = i.PRODUCT_KEY) AS INSPECTION_RESULT
    FROM Buy AS b
    JOIN Product AS p ON b.PRODUCT_KEY = p.PRODUCT_KEY
    WHERE b.BUY_BUYER_KEY = ${userKey} AND b.BUY_STATUS = 3 AND b.BUY_EDATE BETWEEN '${startDate}' AND '${endDate}'
    ${ getProgressStatusCondition(state) }
    ${ getMysqlOrderCondition(orderDir) }
    LIMIT ${start}, ${count};`;

    await db.sequelize.query(query , { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
        //console.log("getProgressBuyList has been responsed from db : ",result);
        res.json(result);
    })
    .catch((err) => console.log(err))
}

//*** 여러개의 order by 를 사용할 경우 왼쪽부터 순차적으로 진행되기 때문에 순서를 고려해야 한다.
function getMysqlOrderCondition(orderDir)
{
    //orderDir "ASC" : 입고완료 -> 검수중 -> 보류(불합격) -> 합격
    //orderDir "DESC" : 합격 -> 보류(불합격) -> 검수중 -> 입고완료
    if(orderDir == "DESC")
    {
        return `ORDER BY INSPECTION_RESULT DESC, INSPECTION_STATUS DESC`
    }
    else
    {
        return `ORDER BY INSPECTION_STATUS ASC, INSPECTION_RESULT ASC`
    }
}

async function getDoneBuyListCount(req, res) {
    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const state = req.body.state; 

    await Buy.count({
        where:{
            BUY_BUYER_KEY: userKey,
            BUY_STATUS: getDoneStatusCondition(state),
            BUY_SDATE: {[Op.between]: [startDate, endDate]}
        }
    })
    .then((result) => {
        console.log("getDoneBuyListCount has been responsed from db : ",result);
        res.json(result);
    })
    .catch((err) => console.log(err))
}

function getDoneStatusCondition(state)
{
    switch(state){
        case 1:{
            return '1';
        }
        case 2:{
            return '4';
        }
        default:{
            return {[Op.or]:['1', '4']};
        }
    }
}

async function getDoneBuyList(req, res) {
    const userKey = req.body.USER_KEY;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const start = req.body.limitStart;
    const count = req.body.limitCount;
    const state = req.body.state; 
    const orderColumn = req.body.orderColumn;
    const orderDir = req.body.orderDir;

    await Buy.findAll({
        where:{
            BUY_BUYER_KEY: userKey,
            BUY_STATUS: getDoneStatusCondition(state),
            BUY_SDATE: {[Op.between]: [startDate, endDate]}
        },
        include:{
            model:Product,
            attributes: ['PRODUCT_NAME', 'PRODUCT_BRAND', 'PRODUCT_PIC'],
        },
        limit:[start, count],
        order:getSeqOrderCondition(orderColumn, orderDir),
    })
    .then((result) => {
        console.log("getDoneBuyList has been responsed from db : ",result);
        res.json(result);
    })
    .catch((err) => console.log(err))
} 

module.exports = {getBuyCounts, getWaitBuyList, getProgressBuyList, getDoneBuyList, getWaitBuyListCount, getProgressBuyListCount, getDoneBuyListCount};
