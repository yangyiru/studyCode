// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 我赠送的
  toGetList() {
    wx.navigateTo({
      url: '/pages/getList/getList',
    })
  },
  // 我收到的
  toGiveList() {
    wx.navigateTo({
      url: '/pages/giveList/giveList',
    })
  },
  // 我的回忆
  toRecordList(){
    wx.navigateTo({
      url: '/pages/recordList/recordList',
    })
  }
})