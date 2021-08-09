// miniprogram/pages/login/index.js

import {
  authorize
} from '../../api/user.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarTitle:'授权信息',
  },
  // 授权
  onGetUserInfo(e) {

    wx.showLoading({
      title: '正在授权'
    });

    if (e.detail.errMsg === "getUserInfo:ok") {

      app.globalData.userInfo = e.detail.userInfo;

      authorize(e.detail.userInfo).then(res => {

        if (res.result.errMsg === 'user.authorize.ok' || res.result.errMsg === 'user.authorize:authorized') {

          app.onAuthorized(res.result.data.userInfo);
          wx.showLoading({
            title: '授权成功'
          });
          setTimeout(() => {
            wx.hideLoading();
            app.navigateBack();
          }, 1000);
          return;

        }

        wx.nextTick(() => {
          wx.showToast({
            title: '授权失败',
            icon: 'none',
            duration: 1000
          });
        });

      });

    } else {

      wx.nextTick(() => {
        wx.showToast({
          title: '授权失败',
          icon: 'none',
          duration: 1000
        });
      });

    }

  },
  handlerGobackClick(){
    app.navigateBack()
  },
})