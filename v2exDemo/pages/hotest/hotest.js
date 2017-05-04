var containDataArray = [];
var Api = require('../../utils/api.js') 
  
var GetList = function (that) {  
    that.setData({  
        hidden: false  
    });  
    wx.request({  
        url: Api.getLatestTopic({
        p: 1
      }),  
        data: {
        },  
        success: function (res) {
            if (containDataArray.length > 0) {
                containDataArray.splice(0, containDataArray.length);
            }
            containDataArray.push.apply(containDataArray, res.data);

            // var l = that.data.list  
            // for (var i = 0; i < res.data.length; i++) {  
            //     l.push(res.data[i])  
            // }  
            that.setData({  
                list: containDataArray  
            });   
            that.setData({
                hidden: true  
            });  
        }  
    });  
}  

var LoadMoreDataList = function (that) {  
    that.setData({  
        hidden: false  
    });  
    wx.request({  
        url: Api.getLatestTopic({
        p: 1
      }),  
        data: {
        },  
        success: function (res) {
            containDataArray.push.apply(containDataArray, res.data);  
            that.setData({  
                list: containDataArray  
            });   
            that.setData({
                hidden: true  
            });  
        }  
    });  
}
Page({  
    data: {  
        hidden: true,  
        list: [],  
        scrollTop: 0,  
        scrollHeight: 0  
    },  
    onLoad: function () {  
        var that = this;  
        wx.getSystemInfo({  
            success: function (res) {  
                console.info(res.windowHeight);  
                that.setData({  
                    scrollHeight: res.windowHeight  
                });  
            }  
        });  
    },  
    onShow: function () {  
        var that = this;  
        GetList(that);  
    },  
    bindDownLoad: function () {  
        var that = this;  
        LoadMoreDataList(that);  
    },  
    scroll: function (event) {  
        this.setData({  
            scrollTop: event.detail.scrollTop 
        });  
    },  
    refresh: function (event) {   
        this.setData({  
            // list: [],  
            scrollTop: 0  
        });  
        GetList(this)  
    } 
})  