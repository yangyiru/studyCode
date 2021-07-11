// 查看所有背景
async function queryAllBackground() {
  return wx.cloud.callFunction({
    name: 'background',
    data: {
      action: 'queryAllBackground'
    }
  });
}
module.exports = {
  queryAllBackground:queryAllBackground
}