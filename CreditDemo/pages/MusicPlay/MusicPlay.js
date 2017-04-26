var data = require('../../utils/data.js')
var favUtil = require('../../utils/fav.js')
var strRe = /\[(\d{2}:\d{2})\.\d{2,}\](.*)/;

Page({
    data: {
        toastHidden: true
    },

    onLoad: function(param) {
        this.setData({
            currentID: param.id
        })
        this.idsMap = wx.getStorageInfoSync('ids') || {}
        this.idsArr = Object.keys(this.idsMap);
    }
  
})
