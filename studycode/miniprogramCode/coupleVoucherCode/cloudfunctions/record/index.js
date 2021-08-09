// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  const log = cloud.logger()
  log.info({
    event: event
  })

  const wxContext = cloud.getWXContext()

  if (event.action && recordHelper[event.action]) {
    const result = await recordHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }

}

const recordHelper = {
  // 查询我的回忆
  async queryCurrentUserRecord(context, params) {
    const {
      OPENID
    } = context
    let res = await db.collection('records')
      .aggregate()
      .match({
        _openid: OPENID
      })
      .lookup({
        from: 'tickets',
        localField: 'ticketId',
        foreignField: '_id',
        as: 'ticket',
      })
      .sort({
        createdAt: -1
      })
      .end()
    return res
  },
  // 查询我们的回忆
  async queryCurrentRecord(context, params) {
    const {
      OPENID
    } = context
    const $ = db.command.aggregate
    let res = await db.collection('tickets')
      .aggregate()
      .lookup({
        from: 'records',
        localField: '_id',
        foreignField: 'ticketId',
        as: 'records',
      })
      .match({
        _openid: OPENID,
        records: $.neq([])
      })
      .sort({
        useTime: -1
      })
      .end()
    return res
  },
  // 查询卡券回忆
  async queryCurrentTicketRecord(context, params) {

    let res = await db.collection('records').where({
      ticketId: params.ticketId
    }).get()

    return res


  },
  // 删除回忆
  async removeRecordById(context, params) {

    let res = await db.collection('records')
      .doc(params.id).remove()

    return res


  },
  // 添加回忆
  async addRecord(context, params) {
    const {
      OPENID
    } = context
    params.record._openid = OPENID
    let res = await db.collection('records')
      .add({
        data: params.record
      })

    return res


  }

}