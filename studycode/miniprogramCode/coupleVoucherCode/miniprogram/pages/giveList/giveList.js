let app = getApp()
import {
  queryCurrentTicket
} from '../../api/ticket'
import {
  queryMyGive,
  giveTicket
} from '../../api/give'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle: '我收到的',
    showWindow: false,
    showGif: true,
    showBtn: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 领取卡券处理
    if (options.ticket) {
      var ticket = JSON.parse(options.ticket)
      // 显示
      setTimeout(function () {
        that.setData({
          showGif: false
        })
      }, 2500)

      // 判断是否被领取
      queryCurrentTicket(ticket._id).then(res => {
        console.log(res.data)
        if (res.result.data.status == 0) {
          // 动画执行
          setTimeout(function () {
            var animation = wx.createAnimation({
              duration: 800,
              timingFunction: 'ease',
            })
            animation.scale(0, 0).step()
            animation.scale(1, 1).opacity(1).step()
            animation.translateY(-100).step()
            that.setData({
              animationData: animation.export()
            })
          }, 500)


          that.setData({
            ticket: ticket,
            showWindow: true
          })
          setTimeout(function () {
            that.setData({
              showBtn: true
            })
          }, 2800)
        } else {
          wx.showToast({
            title: '你来晚了，券已被领取',
            icon: 'none'
          })
          that.setData({
            showWindow: false
          })
        }
      })


    }
  },
  handlerGobackClick() {
    app.navigateBack()
  },
  // 领取
  onGive() {
    this.setData({
      giveDisabled: true,
    })
    let db = wx.cloud.database()
    this.data.createTime = db.serverDate()
    giveTicket(this.data.ticket).then(res => {
      this.getGivesList()
      this.data.ticket.status = 1
      this.setData({
        ticket: this.data.ticket,
        showWindow: false,
        giveDisabled: false
      })
    })


  },
  // 取消
  onCancel() {
    wx.navigateBack()
  },

  onShow() {
    this.getGivesList()
  },
  // 查询收到列表
  getGivesList() {

    queryMyGive().then(res => {
      console.log(res)
      this.setData({
        tickets: res.result.data,
      })
    })
  },
  // 查看详情
  toInfo(res) {
    let ticketId = res.currentTarget.dataset.ticketid
    let _id = res.currentTarget.dataset.id
    let status = res.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/info/info?_id=' + _id + '&type=3&status=' + status + '&ticketId=' + ticketId,
    })
  },
})