var Api = require('../../utils/api.js')

Page({
  data:{
      latest: [],
      hidden: false
  },
  onLoad:function(options){
    this.fetchData();
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    this.fetchData()
  },

  // on


  redictDetail: function(e) {
    var id = e.currentTarget.dataset.id,
    url = '../detail/detail?id=' + id;

    console.log(url)

    wx.navigateTo({
      url: url
    })
  },
  fetchData(){
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getLatestTopic({
        p: 1
      }),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res);
        that.setData({
          latest: res.data
        })
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        setTimeout(function(){
          that.setData({
            hidden: true
          })
        }, 300)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})