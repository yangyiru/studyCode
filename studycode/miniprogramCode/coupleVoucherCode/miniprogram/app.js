import {
  queryCurrentUser,
  getOpenId
} from 'api/user.js'

App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-2gchiulm4934307d',
        traceUser: true,
      })
    }


    wx.showLoading({
      title: '请稍后',
      mask: true
    });

    getOpenId().then(res => {
      wx.setStorageSync('openid', res.result.openid)
    })

    this.authorized = false;
    queryCurrentUser().then(res => {
      if (res.result.errMsg === 'user.query.ok') {
        this.onAuthorized(res.result.data.userInfo);
        this.authorized = true;
      }
      wx.hideLoading();
    }).catch(console.error);
  },

  onAuthorized(userInfo) {
    this.authorized = true;
    this.globalData.userInfo = userInfo;
  },

  navigateBack() {

    let currentPages = getCurrentPages();
    if (currentPages.length > 1) {
      wx.navigateBack({
        delta: 1
      });
      return;
    }
    this.navigateHome();

  },

  navigateHome() {

    wx.switchTab({
      url: '/pages/index/index'
    });

  },


  globalData: {
    userInfo: {
      avatarUrl: '/images/header.png',
      nickName: '游客',
    },
    imgSrc:'',
    openid: ''
  }

})