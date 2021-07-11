let app = getApp()
Page({
  data: {
    navBarTitle: '自定义背景',
    src: '',
    width: 335, //宽度
    height: 120, //高度
  },
  onLoad: function (options) {
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.upload(); //上传图片
    wx.showLoading({
      title: '加载中'
    })
  },
  handlerGobackClick() {
    app.navigateBack()
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  submit() {
    this.cropper.getImg((obj) => {
      app.globalData.imgSrc = obj.url;
      console.log('obj.url', obj.url)
      wx.navigateBack({
        delta: -1
      })
    });
  },
})