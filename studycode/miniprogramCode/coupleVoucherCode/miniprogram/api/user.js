async function queryCurrentUser() {

  return wx.cloud.callFunction({
    // 云函数名称
    name: 'user',
    // 传给云函数的参数
    data: {
      action: 'queryCurrentUser'
    }
  });

}

async function authorize(userInfo) {

  return wx.cloud.callFunction({
    // 云函数名称
    name: 'user',
    // 传给云函数的参数
    data: {
      action: 'authorize',
      userInfo: userInfo
    }
  });

}

async function getOpenId() {

  return wx.cloud.callFunction({
    // 云函数名称
    name: 'user',
    // 传给云函数的参数
    data: {
      action: 'getOpenId'
    }
  });

}


module.exports = {
  queryCurrentUser: queryCurrentUser,
  authorize: authorize,
  getOpenId:getOpenId
}