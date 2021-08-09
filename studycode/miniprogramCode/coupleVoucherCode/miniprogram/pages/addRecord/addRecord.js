let app = getApp()
import {
  addRecord
} from '../../api/record'
const dayjs = require('dayjs')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm'),
    navBarTitle:'添加记录',
    imgList: [],
    upLoadImg: [],
    videos: [], // 视频列表
    upLoadVideos: [],
    btnStr: '记录一下',
    voices: [],
    isShowVoice: false,
    isShowAdvertising: 1,
    location: 'work/join/',
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ticketId:options.ticketId
    })

  },
  handlerGobackClick(){
    app.navigateBack()
  },
  isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  },
  /**删除图片 */
  delImg(e) {
    let index = e.target.dataset.index;
    let list = this.data[`imgList`];
    console.log(list)
    let _list = this.data[`upLoadImg`];
    console.log(_list)
    list.splice(index, 1)
    _list.splice(index, 1)
    this.setData({
      [`imgList`]: list,
      [`upLoadImg`]: _list
    })
  },
  /**选择图片 */
  /**选择图片 */
  chooseImg() {

    let that = this;

   

        wx.chooseImage({
          count: 9 - that.data[`imgList`].length,
          sizeType: ['compressed'],
          success: function (res) {
            let _list = res.tempFilePaths;
            let imgBens = []
            _list.forEach((item, index, arr) => {
              // 检测图片大小
              if (item && item.size > 1024 * 1024) {
                wx.showToast({
                  title: '图片不能大于1M',
                  icon: 'none'
                })
                return;
              }


              //图片正常
              // 上传图片
              wx.showLoading({
                title: '图片上传中',
              })
              that.setData({
                disabled: true,
              })
              let filePath = item;
              console.log(filePath)
              const name = Math.random() * 1000000;
              const cloudPath = "memories/" + name + filePath.match(/\.[^.]+?$/)[0]
              let imgBen = {
                filePath: filePath,
                name: name,
                cloudPath: cloudPath
              }
              imgBens.push(imgBen)

              wx.cloud.uploadFile({
                cloudPath: cloudPath,
                filePath: filePath, // 文件路径
              }).then(res => {
                wx.hideLoading()
                console.log('res', res)
                let str = res.fileID
        var strIndex = str.lastIndexOf("\/");
        str = str.substring(strIndex + 1, str.length);

        let imageURL = 'https://7072-pro-0hm6x-1303088679.tcb.qcloud.la/memories/' + str
                let list = that.data[`upLoadImg`];
                list = list.concat(imageURL)
                that.setData({
                  [`upLoadImg`]: list,
                  upLoadIng: false,
                  disabled: false
                });
              })
            });



            that.setData({
              [`imgList`]: that.data[`imgList`].concat(_list),
              upLoadIng: true
            })
          },
        })

  },

  bindRemark: function (e) {
    this.setData({
      inputRemark: e.detail.value
    })
  },

  send: function (e) {

    this.setData({
      disabled: true
    })
    if(this.data.inputRemark==''||!this.data.inputRemark){
      wx.showToast({
        title: '内容不能为空',
        icon:'none'
      })
      this.setData({
        disabled: false
      })
      return
    }
   
    let formData = {
      remark: this.data.inputRemark,
      ticketId: this.data.ticketId,
      date: this.data.date,
      time: this.data.time,
      createdAt: Date.now(),
      userInfo: app.globalData.userInfo,
    }


    wx.cloud.callFunction({
      name: 'msgSecCheck',
      data: {
        content: formData.name + formData.remark
      }
    }).then(ckres => {

      if (ckres.result.errCode == 0) {


        this.addrecord(formData)


      } else {
        wx.hideLoading();
        this.setData({
          disabled: false
        })
        wx.showModal({
          title: '提醒',
          content: '请注意言论',
          showCancel: false
        })
      }
    })
  },

  addrecord(formData) {

    formData.imgs = this.data.upLoadImg

    addRecord(formData)
      .then(res => {
        wx.showToast({
          title: '记录成功',
          icon:'none'
        })
        wx.setStorageSync('recordId', res.result._id)
        setTimeout(res=>{
          wx.navigateBack()
        },1000)
       
      })


  },


})