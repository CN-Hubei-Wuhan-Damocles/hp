<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <Swiper
      :background="background"
      :circular="circular"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    ></Swiper>
    <!-- 音乐 -->
    <div class="music" @click="changeMusic">
      <img :src="isStart?'../../static/music/music-start.png':'../../static/music/music-stop.png'" />
    </div>
    <!-- 内容 -->
    <div class="sign-container">
      <!-- 数据展示 -->
      <div class="sign">
        <!-- 已报名 -->
        <div>
          <span>{{ count }}</span>
          <span>已报名</span>
        </div>
        <!-- 总投票 -->
        <div>
          <span>{{ vote }}</span>
          <span>总投票</span>
        </div>
        <!-- 浏览量 -->
        <div>
          <span>{{ view }}</span>
          <span>浏览量</span>
        </div>
      </div>
      <!-- 我要报名 -->
      <div class="mine">
        <button type="default" @click="toSign">我要报名</button>
      </div>
      <!-- 活动倒计时 -->
      <div class="ctime">
        <span>距离活动结束：</span>
        <CTime :endTime="end" :endText="endText"></CTime>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <input class="weui-input" placeholder="姓名" v-model="fullName" />
        <div @click="searchPer">搜索</div>
      </div>
      <!-- 分组 -->
      <div class="select">
        <picker @change="bindPickerChange" :value="index" :range="array">
          <view class="picker">{{array[index]}}</view>
          <img src="../../../static/images/bottom.png" />
        </picker>
      </div>
      <!-- 分组内容 -->
      <div class="contentWrap">
        <block v-for="item in list" :key="key">
          <Item :img="item.coverImg" :count="item.ticket" :name="item.name" :id="item.id"></Item>
        </block>
      </div>
      <!-- 底部 -->
      <div class="foot" v-if="isBottom">已经到底部了~</div>
      <!-- 底部图片 -->
      <div class="footImg" v-if="isBottom">
        <img src="../../../static/images/banner.png" />
      </div>
      <!-- 左侧固定按钮 -->
      <div class="btn btn1" @click="handleClick1">列表</div>
      <div class="btn btn2" @click="handleClick2">关注</div>
      <div class="btn btn3" @click="handleClick3">客服</div>
    </div>
  </div>
</template>

<script>
import Swiper from "../../components/swiper";
import Item from "../../components/item";
import CTime from "../../components/cTime";
export default {
  name: "home",
  data() {
    return {
      // 轮播图数据
      background: [
        {
          id: 1,
          img:
            "http://img5.imgtn.bdimg.com/it/u=3037642124,643448925&fm=26&gp=0.jpg"
        }
      ],
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      // 报名数据
      count: 60,
      vote: 1552,
      view: 6761,
      index: 0,
      array: [
        "选择分组",
        "北大青鸟鲁广校区",
        "北大青鸟光谷校区",
        "北大青鸟光谷学院",
        "课工场华中直营总校",
        "课工场徐东校区",
        "课工场光谷校区",
        "课工场郑州兰德校区",
        "北大青鸟徐东校区"
      ],
      // 分组数据
      list: [], // 遍历数据，根据数据不同显示不同
      beforeList: [], // 存放全部接口数据
      pickList: [], // 存放分组数据
      searchList: [], // 存放搜索数据
      end: "2020-08-30 00:00:00",
      endText: "活动已结束",
      // 播放暂停音乐
      isStart: false,
      musicUrl: "",
      // 搜索姓名
      fullName: "",
      // 上拉数据完后显示底部内容
      isBottom: false,
      conNum: 0,
      current: 6, // 每次上拉多显示的数据数
      // 区分上拉显示的是默认数据，还是分组数据，还是搜索数据
      pullNum: 0
    };
  },
  methods: {
    // 分组显示数据
    bindPickerChange(e) {
      this.pullNum = 1; // 改变上拉显示的数据为分组
      this.conNum = 0;
      this.index = e.mp.detail.value;
      let value = this.array[this.index];
      if (value == "选择分组") {
        this.pickList = this.beforeList;
      } else {
        this.pickList = this.beforeList.filter(item => item.groupName == value);
      }
      this.topPull(this.pickList);
      this.fullName = "";
    },
    handleClick1() {
      wx.navigateTo({
        url: "../active/main"
      });
    },
    // 进入报名
    toSign() {
      wx.navigateTo({
        url: "../sign/main"
      });
    },
    // 音乐播放暂停
    changeMusic() {
      this.isStart = !this.isStart;
      let _this = this;
      if (this.isStart) {
        wx.playBackgroundAudio({
          dataUrl: _this.musicUrl
        });
      } else {
        wx.pauseBackgroundAudio();
      }
    },
    // 后台音乐状态监听
    onMusicState() {
      let _this = this;
      // 后台音乐暂停
      wx.onBackgroundAudioPause(() => {
        _this.isStart = false;
      });
      // 后台音乐播放
      wx.onBackgroundAudioPlay(() => {
        _this.isStart = true;
      });
      // 后台音乐状态
      wx.getBackgroundAudioPlayerState({
        success(res) {
          const status = res.status;
          if (status == 1) {
            _this.isStart = true;
          } else {
            _this.isStart = false;
          }
        }
      });
    },
    // home页面接口数据
    getHomeData() {
      this.$fly
        .post(this.$api.index, {
          activityId: 1
        })
        .then(res => {
          let data = res.data.data.hdActivity;
          // console.log(data);
          // 倒计时
          this.end = data.end;
          // 音乐
          this.musicUrl = data.music;
          // 报名数据
          this.vote = data.sumVote;
          this.view = data.browse;
          this.count = data.enroll;
          // 获取音乐路径数据后再调用音乐播放监听
          this.$nextTick(() => {
            this.changeMusic();
          });
        });
    },
    // 全部成员数据
    getList() {
      this.$fly
        .post(this.$api.allList, {
          activityId: 1
        })
        .then(res => {
          this.beforeList = res.data.rows; // 存放数据
          this.topPull(this.beforeList); // 初始数据
        });
    },
    // 搜索成员
    searchPer() {
      this.index = 0; // 将分组还原
      this.pullNum = 2;
      this.conNum = 0;
      if (this.fullName) {
        this.$fly
          .post(this.$api.search, { activityId: 1, name: this.fullName })
          .then(res => {
            this.searchList = res.data.rows;
            this.topPull(this.searchList);
          });
      }
    },
    // 上拉加载数据
    topPull(arr) {
      this.conNum += this.current;
      this.list = arr.filter((item, index) => index < this.conNum); // 显示数据 根据分组显示不同数据
      if (this.conNum > arr.length) {
        this.isBottom = true;
        this.conNum = 0;
        this.pullNum = 3; // 避免无限加载
      } else {
        this.isBottom = false;
      }
    }
  },
  components: {
    Swiper,
    Item,
    CTime
  },
  onLoad() {
    this.getHomeData();
    this.getList();
  },
  onShow() {
    this.onMusicState();
  },
  // 上拉加载数据独立事件
  onReachBottom: function() {
    wx.showLoading({
      title: "数据加载中..."
    });
    if (this.pullNum == 0) {
      this.topPull(this.beforeList);
    } else if (this.pullNum == 1) {
      this.topPull(this.pickList);
    } else if (this.pullNum == 2) {
      this.topPull(this.searchList);
    }
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
  },
  // 下拉刷新页面
  onPullDownRefresh() {
    // 初始化内容
    this.isBottom = false;
    this.conNum = 0;
    this.index = 0;
    this.pullNum = 0;
    this.fullName = "";
    this.topPull(this.beforeList);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  }
};
</script>

<style scoped>
.home-container {
  background-color: #eeeeee;
  position: relative;
}
.sign-container {
  padding: 20rpx;
  margin-top: 10rpx;
  box-sizing: border-box;
  bottom: 400rpx;
}
.sign {
  width: 100%;
  height: 150rpx;
  background-color: rgb(49, 201, 177);
  color: white;
  display: flex;
  border-radius: 5rpx;
}
.sign > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
}
.mine {
  margin-top: 40rpx;
  font-size: 32rpx;
}
.mine > button {
  width: 80%;
  background-color: rgb(49, 201, 177);
  border: none;
  color: white;
  border-radius: 20rpx;
}
.ctime {
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 5rpx;
  text-align: center;
  color: #999999;
  background-color: #fff;
  margin-top: 40rpx;
  font-size: 30rpx;
}
.search {
  display: flex;
  height: 70rpx;
  line-height: 70rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
}
.search > .weui-input {
  width: 70%;
  display: block;
  height: 70rpx;
  background-color: white;
  text-indent: 0.2em;
  padding-left: 50rpx;
  color: #333333;
  caret-color: #cccccc;
}
.search > div {
  width: 30%;
  display: inline-block;
  background-color: rgb(49, 201, 177);
  text-align: center;
  color: white;
}
.select {
  width: 50%;
  height: 60rpx;
  line-height: 60rpx;
  background-color: rgb(49, 201, 177);
  color: white;
  text-align: center;
  position: relative;
  margin-top: 20rpx;
  font-size: 28rpx;
}
.select img {
  width: 25rpx;
  height: 25rpx;
  position: absolute;
  right: 10rpx;
  top: 20rpx;
}
.contentWrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10rpx;
}
.foot {
  margin-top: 80rpx;
  margin-bottom: 80rpx;
  color: #cccccc;
  text-align: center;
}
.footImg > img {
  width: 100%;
  height: 200rpx;
}
.btn {
  width: 80rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background-color: rgb(246, 255, 255);
  font-size: 24rpx;
  border: 1px solid rgba(74, 255, 255, 0.4);
  color: #999;
  position: fixed;
  left: 0rpx;
  z-index: 99;
}
.btn1 {
  bottom: 230rpx;
}
.btn2 {
  bottom: 140rpx;
}
.btn3 {
  bottom: 50rpx;
}
.music {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: 50rpx;
  right: 15rpx;
  animation: rotate 3s linear infinite;
}
.music > img {
  width: 100%;
  height: 100%;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>