// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (event.action && ticketHelper[event.action]) {
    const result = await ticketHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }
}

const db = cloud.database();

const ticketHelper = {
  // 添加卡券
  async addTicket(context, params) {
    params.ticket._openid = context.OPENID
    let res = await db.collection('tickets').add({
      data: params.ticket
    })
    return res
  },
  // 查看我的卡券
  async queryMyTicket(context, params) {
    const {
      OPENID
    } = context
    let res = await db.collection('tickets').where({
      _openid: OPENID
    }).orderBy('createdAt', 'desc').get()
    return res
  },
  // 查看卡券详情
  async queryCurrentTicket(context, params) {
    let res = await db.collection('tickets').doc(params.ticketId).get()
    return res
  },
  // 删除卡券
  async removeTicket(context, params) {
    let res = await db.collection('tickets').doc(params.ticketId).remove()
    return res
  },

}