let app = getApp()
const dayjs = require('dayjs')
import {
  removeTemplate,
  addTemplate,
  updateTemplate
} from '../../api/template' 

import {
  addTicket
} from '../../api/ticket'

Page({

  data: {
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm'),
    navBarTitle:'填写信息',
    selectIndex: 0, // 默认选择样式
    color: '#fafafa', // 默认文字颜色
    colors: ['#fafafa', '#2a2a2a', '#ccc', '#f58b98', '#f5e08b', '#8bcef5', '#8bf5a4', '#c28bf5'], // 颜色选择列表数据
    showWindow: false, // 弹窗控制
    action: 0 // 0 添加 1 修改
  },

  onLoad: function (options) {
    // 判断模式
    if (options.action == 'update') {
      let templateInfo = JSON.parse(options.templateInfo)
      this.setData({
        title: templateInfo.title,
        info: templateInfo.info,
        color: templateInfo.color,
        _id: templateInfo._id,
        bgUrl: templateInfo.backgroundurl,
        type:templateInfo.type,
        action: 1
      })
    } else {
      this.setData({
        bgUrl: options.bgUrl
      })
    }
  },
  handlerGobackClick(){
    app.navigateBack()
  },
  // 删除模版
  del() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除？删除后不可恢复！',
      success(res) {
        if (res.confirm) {
          removeTemplate(that.data._id).then(res => {
            wx.navigateBack({
              delta: -1
            })
          })
        }
      }

    })
  },
  // 去自定义背景
  toCropper() {
    wx.navigateTo({
      url: '/pages/selectBackground/selectBackground?action=update',
    })
  },
  // 选择背景后处理
  onShow() {
    if (wx.getStorageSync('bgUrl')) {
      this.setData({
        bgUrl: wx.getStorageSync('bgUrl')
      })
      wx.setStorageSync('bgUrl', null)
    }
  },
  // 选择文字颜色
  selectColors(res) {
    let color = res.target.dataset.color
    let index = res.target.dataset.index
    this.setData({
      color: color,
      selectIndex: index
    })
  },
  // 赠送
  onUsed() {
    this.setData({
      showWindow: true,
      gif: '../../images/give.gif'
    })
  },
  // 添加模版
  onAdd: function (res) {
    let type = res.currentTarget.dataset.type
    var that = this
    wx.showLoading({
      title: '生成中',
    })

    if (that.data.title == '') {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (that.data.info == '') {
      wx.showToast({
        title: '请填写介绍',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var formData = {
      title: that.data.title,
      info: that.data.info,
      backgroundurl: this.data.bgUrl,
      color: this.data.color,
      type: 1, // 0 未领取 1 已领取
      date: this.data.date,
      time: this.data.time,
      createdAt: Date.now(),
    }

    wx.cloud.callFunction({
      name: 'msgSecCheck',
      data: {
        content: formData.title + formData.info
      }
    }).then(ckres => {

      if (ckres.result.errCode == 0) {

        addTemplate(formData)
          .then(res => {
            console.log(res)
            wx.hideLoading()
            wx.setStorageSync('ticket', formData)
            if(type==0){
              that.onUsed()
            }else{
              wx.navigateBack()
            }
           
            // wx.navigateBack()
          })

      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提醒',
          content: '请注意言论',
          showCancel: false
        })
      }
    })
  },
  // 修改模版
  onUpdate() {
    var that = this
    if (that.data.title == '') {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (that.data.info == '') {
      wx.showToast({
        title: '请填写介绍',
        icon: 'none',
        duration: 2000
      })
      return;
    }



    var formData = {
      title: that.data.title,
      info: that.data.info,
      backgroundurl: this.data.bgUrl,
      color: this.data.color,
      // updateTime: db.serverDate()
    }

    wx.cloud.callFunction({
      name: 'msgSecCheck',
      data: {
        content: formData.title + formData.info
      }
    }).then(ckres => {

      if (ckres.result.errCode == 0) {

        updateTemplate(that.data._id,formData).then(res => {
            console.log(res)
            wx.showToast({
              title: '修改成功',
              icon: 'none',
            })
            wx.navigateBack()
          })

      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提醒',
          content: '请注意言论',
          showCancel: false
        })
      }
    })

  },
  // 自定义背景
  onCropper() {

    wx.navigateTo({
      url: '/pages/cropper/cropper',
    })
  },
  // 监听标题
  bindTitleInput: function (e) {
    console.log(e)
    this.setData({
      title: e.detail.value
    })
  },
  // 监听介绍
  bindInfoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },
  // 监听留言
  bindMessageInput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  // 取消
  onCancel() {
    wx.navigateBack()
  },
  // 开启消息订阅
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let openid = wx.getStorageSync('openid')
    let id = openid + "-" + Date.now()
    console.log('id', id)
    let ticket = {
      _id: id,
      title: this.data.title,
      info: this.data.info,
      backgroundurl: this.data.bgUrl,
      color: this.data.color,
      status: 0,
      useStatus: 0, // 0 未使用 1 已使用
      userInfo: app.globalData.userInfo,
      date: this.data.date,
      time: this.data.time,
      createdAt: Date.now(),
      message: this.data.message
      
    }

    var ticketJSON = JSON.stringify(ticket);
    addTicket(ticket)
      .then(res => {
        console.log('添加成功')
      })
    console.log('pages/index/index?ticket=' + ticketJSON + '&type=1')
    this.setData({
      showWindow:false
    })
    return {
      title: "送你一张" + ticket.title,
      path: 'pages/index/index?ticket=' + ticketJSON + '&type=1',
    }
  }

})