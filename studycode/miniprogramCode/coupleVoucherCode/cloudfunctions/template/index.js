// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {

  const log = cloud.logger()
  log.info({
    event: event
  })

  const wxContext = cloud.getWXContext()

  if (event.action && templateHelper[event.action]) {
    const result = await templateHelper[event.action](wxContext, event)
    return result
  }

  return {
    message: 'This action was not found',
    error: -1,
  }
}

const templateHelper = {

  // 查询私有模版
  async queryPrivateTemplate(context, params) {

    const {
      OPENID
    } = context;

    let res = await db.collection('templates').orderBy('createTime', 'desc').where({
      _openid: OPENID,
      type: 1,
    }).get();

    return res

  },

  // 查询公共模版
  async queryPublicTemplate(context, params) {

    let res = await db.collection('templates').where({
      type: 0,
    }).get();

    return res

  },

  // 删除模版
  async removeTemplate(context, params) {

    let res = await db.collection('templates').doc(params._id).remove();

    return res

  },

  // 添加模版
  async addTemplate(context, params) {
    params.template._openid = context.OPENID
    let res = await db.collection('templates').add({
      data: params.template
    });

    return res

  },

  // 修改模版
  async updateTemplate(context, params) {
    let res = await db.collection('templates').doc(params._id).update({
      data: params.template
    })

    return res

  },


}