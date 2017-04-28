var Util = require('../../utils/util.js')
var Api = require('../../utils/api.js')
Page({
  data:{
    detail: {},
    replies: [],
    hidden: false
  },

fetchDetail: function(id) {
  var that = this;
  wx.request({
    url: Api.getTopicInfo({
      id : id
    }),
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      console.log(res.data);
      res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created));
      that.setData({
        detail: res.data[0]
      })
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
  that.fetchReplies(id);
},

fetchReplies: function(id) {
  var that = this;
  wx.request({
    url: Api.getReplies({
      topic_id: id
    }),
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      res.data.forEach(function(item) {
        item.created = Util.formatTime(Util.transLocalTime(item.created));
      })
      that.setData({
        replies: res.data
      })
      setTimeout(function() {
        that.setData({
          hidden: true
        })
      },300)
    },
    fail: function(res) {
      // fail
    },
    complete: function(res) {
      // complete
    }
  })
},

  onLoad:function(options){
    this.setData({
      hidden: false
    })
    this.fetchDetail(options.id);
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '详情', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})