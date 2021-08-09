// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()

  if (event.action && backgroundHelper[event.action]) {
    const result = await backgroundHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }

  
 
}

const db = cloud.database()

const backgroundHelper = {
  // 查看所有背景
  async queryAllBackground(context, params) {
    let res = await db.collection('background').get()
    return res
  },
}
