
const cloud = require('wx-server-sdk')

cloud.init()

// 检查文字是否合法
exports.main = async(event, context) => {
 
  try {
    const res = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    return res;
  } catch (err) {
    return err;
  }
  return result
}