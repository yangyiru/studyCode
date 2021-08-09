
// 首页
const app = getApp()


Page({
  data: {
    isHover: false,
    userInfo: {}
  },
  handleSatrt() {
    this.setData({
      isHover: true
    })

    
    wx.redirectTo({
      url: '/pages/homeStart/homeStart'
    });
  }
})