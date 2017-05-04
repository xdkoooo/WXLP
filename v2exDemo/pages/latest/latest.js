var Api = require('../../utils/api.js')
var containDataArray = [];

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
        if(containDataArray.length > 0) {
            containDataArray.push.apply(containDataArray, res.data);          
            that.setData({         
              latest: containDataArray
            })
        }else{
            containDataArray.push.apply(containDataArray, res.data);  
            that.setData({          
              latest: res.data
          })
        }
        // that.setData({         
        //   latest: res.data
        // })
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
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: 'v2ex',
      desc: 'xkk dev',
      path: 'pages/latest/latest'
    }
  },

  onReachBottom: function() {
    wx.showNavigationBarLoading()
    this.fetchData()
  }
})