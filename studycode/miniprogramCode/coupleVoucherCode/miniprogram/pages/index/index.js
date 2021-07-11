
// 首页
const app = getApp()
import {
  queryPrivateTemplate,
  queryPublicTemplate
} from '../../api/template'

Page({
  data: {

  },

  onLoad: function (opt) {
    // 领取路径跳转
    if (opt.type == 1) {
      wx.navigateTo({
        url: '/pages/giveList/giveList?ticket=' + opt.ticket,
      })


    }
    // 查询公用的卡券模版
    queryPublicTemplate().then(res => {
      this.setData({
        templates: res.result.data,
      })
    });
  },

  onShow() {
    // 查询私有的卡券模版
    queryPrivateTemplate().then(res => {
      this.setData({
        myTemplates: res.result.data,
      })
    });
  },
  // 去添加模版
  toAdd() {
    if (app.authorized !== true) {
      wx.navigateTo({
        url: '/pages/authorize/authorize'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/selectBackground/selectBackground',
    })
  },
  // 查看详情
  toInfo(res) {
    // 没有授权就先去授权
    if (app.authorized !== true) {
      wx.navigateTo({
        url: '/pages/authorize/authorize'
      });
      return;
    }
    let item = res.currentTarget.dataset.item
    var templateInfo = JSON.stringify(item);
    wx.navigateTo({
      url: '/pages/add/add?action=update&templateInfo=' + templateInfo
    })
  }


})