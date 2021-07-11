

const app = getApp()
const dayjs = require('dayjs')
import {
  queryCurrentTicketRecord
} from '../../api/record'
import {
  removeTicket,
  addTicket,
  queryCurrentTicket
} from '../../api/ticket'
import {
  removeTemplate
} from '../../api/template'
import {
  removeGive
} from '../../api/give'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm'),
    navBarTitle:'卡券详情',
    type: 1, // 1 赠送，2 领取
    showWindow: false,
    intoView:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      _id: options._id,
      type: options.type,
      status: options.status,
      ticketId: options.ticketId,
      openid: wx.getStorageSync('openid')
    })

  },
  handlerGobackClick(){
    app.navigateBack()
  },
  // 删除
  del() {
    let that = this
    let db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '确定删除？删除后不可恢复！',
      success(res) {
        if (res.confirm) {
         
          if (that.data.type == 1) {
            console.log('赠送')
            removeTicket(that.data._id).then(res => {
              if(that.data.ticket.giveId){
                removeGive(that.data.ticket.giveId)
              }
              wx.navigateBack({
                delta: -1
              })
            })
            return
          }
          if (that.data.type == 3) {
            removeGive(that.data.ticketId).then(res => {
              wx.navigateBack({
                delta: -1
              })
            })
            return
          }
        }
      }
    })
  },

  onShow() {
    console.log(this.data._id)
    // 查询当前卡券
      queryCurrentTicket(this.data._id).then(res => {
        console.log(res)
        this.setData({
          ticket: res.result.data
        })
        // 查询相关回忆
        queryCurrentTicketRecord(this.data.ticket._id).then(res => {
          this.setData({
            recordList: res.result.data,
          })
          if(wx.getStorageSync('recordId')){
            this.setData({
              intoView:'x'+wx.getStorageSync('recordId')
            })
            wx.setStorageSync('recordId', null)
          }
          
        })
      }).catch(res=>{
        console.log(res)
        wx.showModal({
          title: '提醒',
          content: '此券已被删除',
          showCancel: false,
          success(res) {
            if (res.confirm) {
                wx.navigateBack()
            }
          }
        })
      })

    

  },
  // 显示赠送弹窗
  showWindow() {
    this.setData({
      showWindow: true,
      gif: '../../images/give.gif'
    })
  },
  // 查看大图
  previewImage(e) {

    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    let imgs = this.data.recordList[index].imgs

    wx.previewImage({
      current: item, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  // 去添加回忆
  toRecord() {
    wx.navigateTo({
      url: '/pages/addRecord/addRecord?ticketId=' + this.data.ticket._id,
    })
  },
  // 领取
  onGive() {
    wx.showLoading({
      title: '领取中',
    })
    this.data.ticket
    giveTicket(this.data.ticket).then(res => {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '领取成功',
          icon: 'none',
        })
        this.data.ticket.status = 1
        this.setData({
          ticket: this.data.ticket
        })
      }
    )
  },

  // 使用
  onUse() {
    let that =this
    if (app.authorized !== true) {
      wx.navigateTo({
        url: '/pages/authorize/authorize'
      });
      return;
    }

    wx.showLoading({
      title: '使用中',
    })
    wx.cloud.callFunction({
      name: 'use',
      data: {
        ticket: this.data.ticket,
        useTime:this.data.date +' '+ this.data.time,
        _id: this.data.ticketId,
        userInfo: app.globalData.userInfo
      },
      success: res => {
        wx.hideLoading()
        that.data.ticket.useStatus = 1
        this.setData({
          ticket: that.data.ticket,
          status: 1
        })
        wx.showModal({
          title: '使用成功',
          content: '点击下方“记录一下”进行记录',
          showCancel: false
        })
      }
    })

  },
  // 获取订阅授权
  onSubscribeMessage() {
    wx.requestSubscribeMessage({
      tmplIds: ['VgejoLy0PtyKEbRK6evCKc_dm9M-pa5WH5J2eafQCI4'],
      success(res) {
        console.log(res);
       
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '订阅失败',
        })
      }
    })
  },
// 监听留言
  bindMessageInput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },

  onCancel() {
    wx.navigateBack()
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.data.ticket.message = this.data.message
    
    var ticket = JSON.stringify(this.data.ticket);
    console.log('pages/index/index?ticket=' + ticket + '&type=1')
    this.setData({
      showWindow:false
    })
    return {
      title: "送你一张" + this.data.ticket.title,
      path: 'pages/index/index?ticket=' + ticket + '&type=1',
    }




  }
})