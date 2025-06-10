// pages/home/home.js
Page({
  data: {
    // 轮播图数据
    banners: [
      {
        id: 1,
        image: 'https://via.placeholder.com/750x400/FF6B6B/FFFFFF?text=喜剧节现场',
        title: '爆笑喜剧节',
        url: '/pages/show/show?id=1'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/750x400/4ECDC4/FFFFFF?text=开心麻花',
        title: '开心麻花专场',
        url: '/pages/show/show?id=2'
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/750x400/FFD93D/333333?text=脱口秀大会',
        title: '脱口秀大会',
        url: '/pages/show/show?id=3'
      }
    ],
    
    // 喜剧分类
    categories: [
      { id: 1, name: '脱口秀', icon: '🎤', color: '#FF6B6B' },
      { id: 2, name: '相声', icon: '🎭', color: '#4ECDC4' },
      { id: 3, name: '话剧', icon: '🎪', color: '#FFD93D' },
      { id: 4, name: '音乐剧', icon: '🎵', color: '#9B59B6' },
      { id: 5, name: '小品', icon: '😄', color: '#E67E22' },
      { id: 6, name: '即兴表演', icon: '🎬', color: '#1ABC9C' }
    ],

    // 今日推荐
    todayRecommended: [
      {
        id: 1,
        title: '开心麻花《乌龙山伯爵》',
        poster: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=乌龙山伯爵',
        venue: '上海话剧艺术中心',
        date: '今晚 19:30',
        price: '¥180起',
        laughLevel: 5,
        tags: ['经典', '爆笑']
      },
      {
        id: 2,
        title: '脱口秀大会现场版',
        poster: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=脱口秀大会',
        venue: '北京喜剧院',
        date: '明晚 20:00',
        price: '¥280起',
        laughLevel: 4,
        tags: ['新秀', '热门']
      }
    ],

    // 热门演出
    hotShows: [
      {
        id: 3,
        title: '德云社相声专场',
        poster: 'https://via.placeholder.com/200x280/FFD93D/333333?text=德云社',
        venue: '德云社剧场',
        date: '2024-06-15',
        price: '¥150起',
        rating: 4.8
      },
      {
        id: 4,
        title: '李诞脱口秀专场',
        poster: 'https://via.placeholder.com/200x280/9B59B6/FFFFFF?text=李诞',
        venue: '天桥艺术中心',
        date: '2024-06-20',
        price: '¥380起',
        rating: 4.9
      }
    ],

    // 明星演员
    starActors: [
      {
        id: 1,
        name: '沈腾',
        avatar: 'https://via.placeholder.com/120x120/FF6B6B/FFFFFF?text=沈腾',
        description: '开心麻花王牌演员',
        shows: 15
      },
      {
        id: 2,
        name: '岳云鹏',
        avatar: 'https://via.placeholder.com/120x120/4ECDC4/FFFFFF?text=岳云鹏',
        description: '德云社当红相声演员',
        shows: 12
      },
      {
        id: 3,
        name: '李诞',
        avatar: 'https://via.placeholder.com/120x120/FFD93D/333333?text=李诞',
        description: '脱口秀大会制作人',
        shows: 8
      }
    ],

    // 附近剧场
    nearbyVenues: [
      {
        id: 1,
        name: '上海话剧艺术中心',
        distance: '1.2km',
        shows: 5,
        image: 'https://via.placeholder.com/200x120/FF6B6B/FFFFFF?text=话剧中心'
      },
      {
        id: 2,
        name: '北京喜剧院',
        distance: '2.5km',
        shows: 8,
        image: 'https://via.placeholder.com/200x120/4ECDC4/FFFFFF?text=喜剧院'
      }
    ],

    // 搜索关键词
    searchValue: '',
    // 热门搜索
    hotSearches: ['开心麻花', '脱口秀', '相声', '李诞', '沈腾']
  },

  onLoad: function (options) {
    console.log('首页加载')
    this.loadData()
  },

  onShow: function () {
    console.log('首页显示')
  },

  onPullDownRefresh: function () {
    console.log('下拉刷新')
    this.loadData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500)
  },

  onReachBottom: function () {
    console.log('上拉加载更多')
    this.loadMore()
  },

  // 加载数据
  loadData: function() {
    wx.showLoading({
      title: '加载中...'
    })
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      })
    }, 800)
  },

  // 加载更多
  loadMore: function() {
    wx.showLoading({
      title: '加载更多...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
    }, 500)
  },

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  // 执行搜索
  onSearch: function() {
    const { searchValue } = this.data
    if (!searchValue.trim()) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return
    }
    
    wx.navigateTo({
      url: `/pages/discover/discover?search=${searchValue}`
    })
  },

  // 热门搜索点击
  onHotSearchTap: function(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({
      searchValue: keyword
    })
    this.onSearch()
  },

  // 轮播图点击
  onBannerTap: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: url
      })
    }
  },

  // 分类点击
  onCategoryTap: function(e) {
    const category = e.currentTarget.dataset.category
    wx.navigateTo({
      url: `/pages/discover/discover?category=${category.id}`
    })
  },

  // 演出详情
  onShowTap: function(e) {
    const showId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${showId}`
    })
  },

  // 演员详情
  onActorTap: function(e) {
    const actorId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/actor/actor?id=${actorId}`
    })
  },

  // 剧场详情
  onVenueTap: function(e) {
    const venueId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/venue/venue?id=${venueId}`
    })
  },

  // 立即购票
  onBuyTicket: function(e) {
    const showId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/ticket/ticket?showId=${showId}`
    })
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '喜番喜剧 - 每一场演出，都是一次快乐的邂逅',
      path: '/pages/home/home',
      imageUrl: 'https://via.placeholder.com/500x400/FF6B6B/FFFFFF?text=喜番喜剧'
    }
  }
}) 