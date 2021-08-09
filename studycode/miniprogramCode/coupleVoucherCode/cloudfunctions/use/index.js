// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  let ticketId = event.ticket._id
  let giveId = event._id
  await db.collection('gives').doc(giveId).update({
    data: {
      status: 1
    }
  })

  
  let useTime = event.useTime




  let ticketsRes = await db.collection('tickets').doc(ticketId).update({
    data: {
      useStatus: 1,
      useTime: useTime,
      useUserInfo: event.userInfo

    }
  })

  try {
    let subscribeMessageRes = await cloud.openapi.subscribeMessage.send({
      touser: event.ticket._openid,
      page: '/pages/info/info?_id=' + ticketId,
      lang: 'zh_CN',
      data: {
        thing1: {
          value: event.ticket.title
        },
        thing2: {
          value: event.ticket.info
        },
        thing3: {
          value: event.userInfo.nickName
        },
        time4: {
          value: useTime
        }
      },
      templateId: 'L0kSYZfFhwPNgI5zPEAzIsd5HFqVnUSxcsVO8pYss98',
      miniprogramState: 'developer'
    })
    return subscribeMessage;
  } catch (err) {
    return ticketsRes;
  }



  
}