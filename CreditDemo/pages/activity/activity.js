//activity.js
//获取应用实例
var data = require('../../utils/data.js').songs;

Page({

  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
    
  },

  onReachBottom: function(options){
    console.log(`Hello mina !`)

    // wx.showModal({
    //   success: function(res) {
    //     if (wx.canIUse('showModal.cancel')) {
    //         console.log(res.cancel)
    //       }
    //     }
    // })
    // wx.showModal({
    //   title: '提示',
    //   content: '当前版本过低，无法使用该功能'
    // })
  },


	data: {
		imgUrls: [
			'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
			'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
			'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
		]
	},

	onLoad: function() {
		var rs = [],
			idsMap = {},
			keys = Object.keys(data),   // [108821,13738,14784738,46348738]
			len = keys.length;          // 4

		for (var i = 0; i < len; i++) {
			var k = keys[i];              // var k = 108821

			rs.push(Object.assign({id: k,}, data[k]));


			// rs.push(Object.assign({
			// 	id: k,
			// }, data[k]));

			idsMap[k] = {
				preid: i > 0 ? keys[i - 1] : 0,
				nextid: i < len - 1 ? keys[i + 1] : 0
			}

			// idsMap[108821] = {preid: 0, nextid: 13738}
			// idsMap[13738] = {preid: 108821, nextid: 14784738}
			// idsMap[14784738] = {preid: 13738, nextid: 46348738}
			// idsMap[46348738] = {preid: 14784738, nextid: 0}
		}

		idsMap[keys[0]].preid = keys[len - 1];
		idsMap[keys[len - 1]].nextid = keys[0];

		this.setData({
			recommends: rs
		});

		wx.setStorageSync('ids', idsMap);
	},
	playTap: function(e) {
		const dataset = e.currentTarget.dataset;
		wx.navigateTo({
			url: `../MusicPlay/MusicPlay?id=${dataset.id}`
		})
	}
  

  
})
