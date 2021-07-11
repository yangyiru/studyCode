// pages/homeStart/home.js.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    message: '你来啦',
    messageList: ['小鲜侣来了呀～', '我发现了一个秘密', '祝你早安', '快乐一整天'],
    list: [
      // {
      //   title: '我的第1款小程序',
      //   date: '2021-09-01',
      //   time: '10:10',
      //   content: '在这里我将毫无保留的与你分享自己这一路上的血与泪，抛 开技术……'
      // }, {
      //   title: '我的第2款小程序',
      //   date: '2021-09-01',
      //   time: '10:10',
      //   content: '在这里我将毫无保留的与你分享自己这一路上的血与泪，抛 开技术，来谈谈与技术同样重要的成长方法论，让你……'
      // }
    ],
    startX: 0,
    startY: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var value = wx.getStorageSync('list')
      if (value) {
        console.log(value, 'dddddd')
        this.setData({
          list: value
        })
      }
    } catch (e) {
      // Do something when catch error
    }  
    console.log(this.data.list.length > 0, 'dddd')
    this.setData({
      isShow: this.data.list.length > 0
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },
  /**
   * 切换问候语
   */
  handleChangeMessage() {
    const floorNum = Math.floor(Math.random()*10);
    const messageList = [...this.data.messageList]
    if(floorNum) {
      this.setData({
        message: messageList[floorNum]
      })
    }
    
  },
  // 开始滑动
  touchStart(e) {
    let dataList = [...this.data.list]
    dataList.forEach(item => {
    // 让原先滑动的块隐藏
      if (item.isTouchMove) {
        item.isTouchMove = !item.isTouchMove;
      }
    });
    console.log('e.touches[0].clientX: ', e.touches[0].clientX)
   // 初始化开始位置
    this.setData({
      list: dataList,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  },
  // 
  touchMove(e) {
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;
    let indexs = e.currentTarget.dataset.id;
    let dataList = [...this.data.list]

    let angle = this.angle({
      X: this.data.startX,
      Y: this.data.startY
    }, {
      X: moveX,
      Y: moveY
    });

    dataList.forEach((item, index) => {
      item.isTouchMove = false;
      // 如果滑动的角度大于30° 则直接return；
      if (angle > 30) {
        return
      }
      if (indexs === index) {
        if (moveX > this.data.startX) { // 右滑
          item.isTouchMove = false;
        } else { // 左滑
          item.isTouchMove = true;
        }
      }
    })

    this.setData({
      list: dataList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  handleEdit() {
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  // 编辑
  toEdit(res) {
    console.log('res.currentTarget.dataset', res.currentTarget.dataset)
    let _id = res.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/add/add?_id=' + _id+ '&type=1',
    })
  },
  // 删除
  handleDel(e) {
    let id = e.currentTarget.dataset.id;
    console.log('id: ', id, e.currentTarget.dataset)
    // let dataList = this.data.list.splice(id, 1);
    // 有个坑： splice 删除数组中的某个项，再重新更新缓存会出现删不掉的情况
    // 方案二
    let dataList = [...this.data.list], arr = [];
    for (var i = 0; i< dataList.length; i++) {
      if (i != id) {
        arr.push(dataList[i])
      }
    }
    wx.setStorage({
      key: 'list',
      data: arr
    })
    this.setData({
      list: arr,
      isShow: arr.length > 0
    })
  }
})