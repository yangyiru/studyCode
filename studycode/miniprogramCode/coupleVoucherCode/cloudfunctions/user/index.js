// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.action && userHelper[event.action]) {
    const result = await userHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }
}

const db = cloud.database();

const errorQueryRes = {
  errMsg: 'user.query:error'
};

const errorAuthorizeRes = {
  errMsg: 'user.authorize:error'
};

const authorizedRes = {
  errMsg: 'user.authorize:authorized'
};

const userHelper = {
  async queryCurrentUser(context, params) {
    const {
      OPENID
    } = context;

    let res = await db.collection('users').where({
      openid: OPENID
    }).field({
      _id: 0,
      authorizedTime: 0
    }).get();

    if (res.errMsg !== 'collection.get:ok') {

      return errorQueryRes;

    }

    if (res.data.length === 0) {

      return {
        errMsg: 'user.query.none'
      };

    }

    return {
      errMsg: 'user.query.ok',
      data: {
        userInfo: res.data[0].userInfo
      }
    };

  },
  async getOpenId(context, params) {
    return {
      openid: context.OPENID,
    }
  },
  async authorize(context, params) {

    const {
      OPENID
    } = context;

    let getRes = await db.collection('users').where({
      openid: OPENID
    }).get();

    if (getRes.errMsg !== 'collection.get:ok') {

      return errorAuthorizeRes;

    }

    if (getRes.data.length > 0) {

      return authorizedRes;

    }

    let addRes = await db.collection('users').add({
      data: {
        openid: OPENID,
        userInfo: params.userInfo,
        authorizedTime: new Date(),
      }
    });

    if (addRes.errMsg !== 'collection.add:ok') {

      return errorAuthorizeRes;

    }

    return {
      errMsg: 'user.authorize.ok',
      data: {
        userInfo: params.userInfo
      }
    };

  }
}