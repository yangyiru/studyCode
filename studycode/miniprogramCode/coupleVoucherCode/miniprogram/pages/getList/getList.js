let app = getApp()
import {
  queryMyTicket
} from '../../api/ticket'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle:'我赠送的',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  handlerGobackClick(){
    app.navigateBack()
  },
  onShow(){
    // 查询我赠送的
    queryMyTicket().then(res => {
      console.log(res)
      this.setData({
        tickets: res.result.data,
      })
    })
  },


  toInfo(res){
    let _id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/info/info?_id=' + _id+ '&type=1',
    })
  },
})