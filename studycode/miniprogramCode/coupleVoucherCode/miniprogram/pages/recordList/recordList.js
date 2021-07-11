const app = getApp()
import {
  removeRecordById,
  queryCurrentRecord
} from '../../api/record.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle:'我的回忆',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查询我的回忆
    queryCurrentRecord().then(res => {
      this.setData({
        recordList: res.result.list,
        openid: wx.getStorageSync('openid')
      })
    })
  },
 // 删除回忆
  recordDel(res) {
    let item = res.currentTarget.dataset.item
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定删除？删除后不可恢复！',
      success(res) {
        if (res.confirm) {
          removeRecordById(item._id).then(res => {
            queryCurrentUserRecord().then(res => {
              that.setData({
                recordList: res.result.list,
              })
            })
          })
        }
      }
    })
  },
  handlerGobackClick(){
    app.navigateBack()
  },
  // 点击查看大图
  previewImage(e) {

    let index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item;
    let imgs = this.data.recordList[index].imgs

    wx.previewImage({
      current: item, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  // 查看详情
  toInfo(res) {
    let _id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/info/info?_id=' + _id
    })
  },

})