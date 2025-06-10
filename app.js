// 喜番喜剧票务小程序
App({
  globalData: {
    userInfo: null,
    token: null,
    serverUrl: 'https://api.xifancomedy.com',
    version: '1.0.0'
  },

  onLaunch: function () {
    console.log('🎭 喜番喜剧小程序启动')
    
    // 获取微信用户信息
    this.getUserInfo()
    
    // 检查更新
    this.checkUpdate()
    
    // 初始化统计
    this.initStats()
  },

  onShow: function (options) {
    console.log('小程序显示', options)
  },

  onHide: function () {
    console.log('小程序隐藏')
  },

  onError: function (msg) {
    console.error('小程序错误:', msg)
    wx.reportAnalytics('error', {
      message: msg
    })
  },

  // 获取用户信息
  getUserInfo: function() {
    const that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  // 检查更新
  checkUpdate: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('检查更新:', res.hasUpdate)
      })
      
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      
      updateManager.onUpdateFailed(function () {
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        })
      })
    }
  },

  // 初始化统计
  initStats: function() {
    wx.reportAnalytics('app_launch', {
      timestamp: Date.now()
    })
  },

  // 工具方法
  utils: {
    formatTime: function(timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      
      return `${year}-${month}-${day} ${hour}:${minute}`
    },

    formatPrice: function(price) {
      return `¥${price.toFixed(2)}`
    },

    showToast: function(title, icon = 'success') {
      wx.showToast({
        title: title,
        icon: icon,
        duration: 2000
      })
    }
  }
}) 