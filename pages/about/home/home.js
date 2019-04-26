Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(999),
          forksCount: that.coutNum(8888),
          visitTotal: that.coutNum(77777)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) - 1000 + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) - 4.8 + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['http://www.reapsun.xyz/img/myChat.png'],
        current: 'http://www.reapsun.xyz/img/myChat.png' // 当前显示图片的http链接      
      })
    },
    listenerButtonChooseImage: function() {
      var that = this;
      wx.chooseImage({
          count: 1,
          //original原图，compressed压缩图
          sizeType: ['original'],
          //album来源相册 camera相机 
          sourceType: ['album', 'camera'],
          //成功时会回调
          success: function(res) {
              //重绘视图
              that.setData({
                  source: res.tempFilePaths
              })
          }
      })
  },
  clickImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
        current: current,
        urls: ["../images/zanCode.png"],
         fail: function() {
      　　　　console.log('fail')
   　　　　 },
        complete: function () {
            console.info("点击图片了");
        },
    })
},
  }
})