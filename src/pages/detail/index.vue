<template>
  <div class="detailContainer">
    <!-- 选手信息 -->
    <Per :detailObj="detailObj"></Per>
    <!-- 选手描述 -->
    <div class="detail-per">
      <div class="detail-per-title">选手描述</div>
      <div class="detail-des">这个人很懒什么都没有留下~</div>
    </div>
    <!-- 选手照片 -->
    <div class="detail-per">
      <div class="detail-per-title">选手照片</div>
      <div class="detail-per-img">
        <img :src="detailObj.img" />
      </div>
    </div>
    <!-- 选手票数贡献榜 -->
    <div class="voteCount">
      <div class="vote-title">票数贡献榜</div>
      <div class="vote-love">
        <scroll-view scroll-y="true" scrollbar-face-color="red" class="vote-view">
          <view id="demo" class="scroll-view-item demo-text">
            <img src="../../../static/images/love.jpg" />
            <span>喜欢我的人 在这里驻留</span>
            <div @click="handleClick3">送ta礼物加票</div>
          </view>
        </scroll-view>
      </div>
    </div>
    <!-- 投票记录 -->
    <div class="vote-record">
      <div class="vote-record-title">投票记录</div>
      <div>
        <div v-for="item in voteList" :key="key" class="voteList">
          <div>
            <span>{{ item.name }}</span>
            <span>+1</span>
          </div>
          <span>{{ item.cTime }}</span>
        </div>
      </div>
      <div class="vote-more">
        <button type="default">查看更多</button>
      </div>
    </div>
    <!-- tabbar内容 -->
    <div class="tabbarCon">
      <div class="tabbar" @click="handleClick1">
        <img src="../../../static/tabs/tabbar1.jpg" />
        <span>首页</span>
      </div>
      <div class="tabbar vote" @click="handleClick2">
        <img src="../../../static/tabs/tabbar2.jpg" />
        <span>投票</span>
      </div>
      <div class="tabbar" @click="handleClick3">
        <img src="../../../static/tabs/tabbar3.jpg" />
        <span>送礼</span>
      </div>
    </div>
    <!-- 占位 -->
    <div style="height:200rpx"></div>
  </div>
</template>

<script>
import Per from "../../components/per";
export default {
  name: "detail",
  components: {
    Per
  },
  data() {
    return {
      // 分组数据
      list: [
        {
          id: 1,
          img: "../../static/images/item1.png",
          name: "罗仪",
          count: 33,
          rank: 6,
          gift: 0,
          view: 1065
        },
        {
          id: 2,
          img: "../../static/images/item2.png",
          name: "k9506张锦泽",
          count: 7,
          rank: 15,
          gift: 0,
          view: 253
        },
        {
          id: 3,
          img: "../../static/images/item3.png",
          name: "k9507骆鑫",
          count: 0,
          rank: 20,
          gift: 0,
          view: 100
        },
        {
          id: 4,
          img: "../../static/images/item4.png",
          name: "k9906班高铁言",
          count: 2,
          rank: 12,
          gift: 0,
          view: 536
        }
      ],
      detailObj: null,
      // 投票记录
      voteList: [
        { id: 1, name: "undefined", cTime: "2019-12-27 10:24:28" },
        { id: 1, name: "undefined", cTime: "2019-10-14 13:45:58" },
        { id: 1, name: "汪琼", cTime: "2019-09-09 08:10:48" },
        { id: 1, name: "张健", cTime: "2019-08-25 12:04:18" },
        { id: 1, name: "蔡艳", cTime: "2019-08-16 16:04:28" }
      ]
    };
  },
  methods: {
    handleClick1() {
      wx.navigateBack({
        delta: 1
      });
    },
    handleClick2() {
      console.log(22);
    },
    handleClick3() {
      let _this = this;
      wx.navigateTo({
        url: `../gift/main?id=${_this.detailObj.id}`
      });
    }
  },
  onLoad(options) {
    let id = options.id;
    this.detailObj = this.list.find(item => item.id == id);
  }
};
</script>

<style scoped>
.detailContainer {
  font-size: 32rpx;
  color: #999999;
  padding: 0rpx 20rpx 0rpx 20rpx;
  background-color: rgb(242, 242, 242);
  height: 100vh;
}
.detail-per-title {
  width: 100%;
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  border-bottom: 1px solid rgb(242, 242, 242);
  background-color: #fff;
  margin-top: 40rpx;
}
.detail-des {
  width: 100%;
  height: 140rpx;
  background-color: #fff;
  padding: 30rpx 0rpx 0rpx 15rpx;
  box-sizing: border-box;
}
.detail-per-img {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 40rpx;
}
.detail-per-img > img {
  width: 100%;
  height: 650rpx;
}
.voteCount {
  margin-top: 40rpx;
}
.vote-title {
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background-color: rgb(157, 248, 72);
}
.vote-love {
  background-color: rgb(253, 249, 250);
  margin-top: 20rpx;
  box-sizing: border-box;
}
.vote-view {
  height: 500rpx;
  width: 100%;
}
.scroll-view-item {
  height: 1000rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
::-webkit-scrollbar {
  background-color: red;
}

::-webkit-scrollbar-thumb {
  background-color: yellow;
}
.vote-love img {
  width: 200rpx;
  height: 200rpx;
}
.vote-love span {
  font-size: 24rpx;
}
.vote-love div {
  width: 70%;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  background-color: rgb(49, 201, 177);
  color: white;
  margin-top: 30rpx;
  text-align: center;
}
.vote-record-title {
  width: 100%;
  height: 65rpx;
  line-height: 65rpx;
  text-align: center;
  border-bottom: 1px solid rgb(242, 242, 242);
  margin-top: 40rpx;
}
.voteList {
  height: 100rpx;
  border-bottom: 1px solid #eeeeee;
  padding-top: 60rpx;
  padding-bottom: 10rpx;
}
.voteList > div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
  padding: 0rpx 60rpx 0rpx 40rpx;
}
.voteList > div > span:nth-child(2) {
  color: rgb(49, 201, 177);
}
.voteList > span {
  padding-left: 40rpx;
}
.vote-more {
  margin-top: 40rpx;
}
.vote-more > button {
  color: white;
  background-color: rgb(49, 201, 177);
}
/* tabbar */
.tabbarCon {
  margin-left: -20rpx;
  width: calc(100% + 20rpx);
  height: 120rpx;
  display: flex;
  background-color: rgb(158, 231, 134);
  padding: 10rpx 0rpx;
  box-sizing: border-box;
  position: fixed;
  z-index: 99;
  bottom: 0rpx;
  color: #333;
}
.tabbarCon > .tabbar:nth-child(1) {
  border-left: none;
}
.tabbar {
  flex: 1;
  border-left: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.tabbar > img {
  width: 80rpx;
  height: 80rpx;
}
.vote > img {
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
  position: absolute;
  top: -65rpx;
}
.vote > span {
  display: inline-block;
  margin-top: 68rpx;
}
</style>