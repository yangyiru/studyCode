// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {


  const wxContext = cloud.getWXContext()

  if (event.action && giveHelper[event.action]) {
    const result = await giveHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }




}

const errorGiveTicketRes = {
  env: cloud.DYNAMIC_CURRENT_ENV,
  errMsg: 'giveTicket:error'
};

const giveHelper = {
  // 领取卡券
  async giveTicket(context, params) {
    const {
      OPENID
    } = context

    let formData = {
      ticketId: params.ticket._id,
      _openid: OPENID,
      ticketInfo: params.ticket,
      createdAt: Date.now(),
      status: 0
    }
    
    let addRes = await db.collection('gives').add({
      data: formData
    })

    if (addRes.errMsg !== 'collection.add:ok') {

      return errorGiveTicketRes;

    }

    let updateRes = await db.collection('tickets').doc(params.ticket._id).update({
      data: {
        status: 1,
        giveId:addRes._id
      }
    })

    if (updateRes.errMsg !== 'update.add:ok') {

      return errorGiveTicketRes;

    }

    return updateRes
  },
  // 查询我的领取
  async queryMyGive(context, params) {
    const {
      OPENID
    } = context
    return await db.collection('gives').where({
      _openid: OPENID
    }).orderBy('createdAt', 'desc').get()
  },
  // 删除我的领取
  async removeGive(context, params) {
    return await db.collection('gives').doc(params.id).remove()
  }
}