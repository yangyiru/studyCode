let app = getApp()
import {
  queryAllBackground
} from '../../api/background.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle: '选择背景',
    action: 0 // 0 添加 1 修改
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断模式 
    if (options.action == 'update') {
      this.setData({
        action: 1
      })
    }
    // 查询所有背景
    queryAllBackground().then(res => {
      this.setData({
        background: res.result.data
      })
    })
  },
  handlerGobackClick() {
    app.navigateBack()
  },
  onShow() {

    let that = this
    // 上传背景
    if (app.globalData.imgSrc != '') {

      let filePath = app.globalData.imgSrc
      const name = Math.random() * 1000000;
      const cloudPath = "backgroundurl/" + name + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath, // 文件路径
      }).then(res => {
        let str = res.fileID
        var strIndex = str.lastIndexOf("\/");
        str = str.substring(strIndex + 1, str.length);
        // let bgUrl = filePath;
        let bgUrl = 'https://636c-cloud1-2gchiulm4934307d-1306423480.tcb.qcloud.la/backgroundurl/' + str
        let background = {
          url: bgUrl
        }
        that.data.background.unshift(background)
        that.setData({
          background: that.data.background
        })
      })
    }

  },
  // 监听选择
  radioChange(e) {
    this.setData({
      selectBg: e.detail.value
    })
  },
  // 去自定义背景
  toCropper() {
    wx.navigateTo({
      url: '/pages/cropper/cropper',
    })

  },
  // 去添加页面
  toNext() {
    if (this.data.selectBg) {
      if (this.data.action == 1) {
        wx.setStorageSync('bgUrl', this.data.selectBg)
        wx.navigateBack()
      } else {
        wx.redirectTo({
          url: '/pages/add/add?bgUrl=' + this.data.selectBg,
        })
      }
    } else {
      wx.showToast({
        title: '请选择背景',
        icon: 'none'
      })
    }
  }
})