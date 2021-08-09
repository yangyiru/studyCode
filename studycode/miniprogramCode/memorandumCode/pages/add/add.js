let app = getApp();
const dayjs = require('dayjs');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle: '填写备忘录',
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm'),
    title: '',
    content: '',
    list: [],
    type: null,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options)
    try {
      var value = wx.getStorageSync('list')
      if (value) {
        console.log(value, 'dddddd')
        this.setData({
          list: value
        })
      }
      if(options.type) {
        console.log(2222, options.type, this.data.list)
        this.setData({
          title: value[options._id].title,
          content: value[options._id].content,
          date: value[options._id].date,
          time: value[options._id].time,
          type: options.type,
          isTouchMove: false,
          id: options._id
        })
      }
      
    } catch (e) {
      // Do something when catch error
    }
  },
  handleback() {
    app.navigateBack()
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindTextarea: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 保存
  onSubForm: function(res) {
    let that = this;
    if (!that.data.title) {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!that.data.content) {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let formData = {
      title: that.data.title,
      content: that.data.content,
      date: that.data.date,
      time: that.data.time,
      isTouchMove: false
    }
    if(that.data.type) {
      that.data.list[that.data.id] = formData;
    } else {
      that.data.list.push(formData)
    }
    wx.setStorage({
      key: 'list',
      data: that.data.list
    })
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
    })
  }
})