<template>
  <div class="detailContainer">
    <!-- 选手信息 -->
    <Per :detailObj="detailObj"></Per>
    <!-- 选手描述 -->
    <div class="detail-per">
      <div class="detail-per-title">选手描述</div>
      <div class="detail-des">
        <span>{{ detailObj.describes?detailObj.describes:"这人很懒什么都没有留下~" }}</span>
      </div>
    </div>
    <!-- 选手照片 -->
    <div class="detail-per">
      <div class="detail-per-title">选手照片</div>
      <div class="detail-per-img">
        <img :src="detailObj.coverImg" />
      </div>
    </div>
    <!-- 选手票数贡献榜 -->
    <div class="voteCount">
      <div class="vote-title">票数贡献榜</div>
      <div class="vote-love">
        <scroll-view scroll-y="true" scrollbar-face-color="red" class="vote-view">
          <view id="demo" class="scroll-view-item demo-text">
            <img src="../../../static/images/love.jpg" v-if="flag" />
            <span v-if="flag">喜欢我的人 在这里驻留</span>
            <div @click="handleClick3" v-if="flag" class="toGift">送ta礼物加票</div>
            <!-- 贡献信息 -->
            <div v-for="item in contribution" :key="key" v-if="!flag" class="contribution">
              <img :src="item.extend3" />
              <span>{{ item.extend2 }}</span>
              <span>{{ item.ticket }}票</span>
            </div>
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
            <span>{{ item.extend2 }}</span>
            <span>+1</span>
          </div>
          <span>{{ item.createTime }}</span>
        </div>
      </div>
      <div class="vote-more">
        <button type="default" @click="loadMore">{{ voteTitle?'已经是最后一页了':'查看更多' }}</button>
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
      detailObj: {},
      // 票数贡献榜,有就显示贡献信息,没有显示默认界面
      contribution: [],
      flag: true,
      // 投票记录
      voteList: [],
      pageSize: 5,
      pageNum: 1,
      voteFlag: false, // 控制更多点击事件
      voteTitle: false,
      id: 0 // 加载更多需要用到选手的id
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
    },
    // 选手详情数据
    getList(id) {
      this.$fly
        .post(this.$api.perDetail, {
          activityId: 1,
          id: id
        })
        .then(res => {
          this.detailObj = res.data.data.player;
          let hdPlayerGiftlist = res.data.data.hdPlayerGiftlist;
          if (hdPlayerGiftlist.length == 0) {
            this.flag = true;
          } else {
            this.flag = false;
            this.contribution = hdPlayerGiftlist;
          }
        });
    },
    // 投票记录--选手
    getVote(id) {
      // 设锁
      if (this.voteFlag) return;
      this.voteFlag = true;
      this.$fly
        .post(this.$api.voteData, {
          playerId: id,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        })
        .then(res => {
          res.data.rows.map(item => {
            this.voteList.push(item);
          });
          // 开锁
          this.voteFlag = false;
          // 数据加载完
          if (this.detailObj.ticket) {
            if (this.detailObj.ticket == this.voteList.length) {
              this.voteFlag = true;
              this.voteTitle = true;
            }
          }
          // 0票情况
          if (this.voteList.length == 0) {
            this.voteTitle = true;
          }
        });
    },
    // 查看更多
    loadMore() {
      this.pageNum++;
      this.getVote(this.id);
    }
  },
  onLoad(options) {
    let id = options.id;
    this.id = id;
  },
  onShow() {
    // 每次打开页面初始化
    this.voteList = [];
    this.pageNum = 1;
    this.voteFlag = false;
    this.voteTitle = false;
    this.getList(this.id);
    this.getVote(this.id);
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
  background-color: #fff;
  padding: 30rpx 15rpx 60rpx 15rpx;
  box-sizing: border-box;
  text-align: justify;
}
.detail-per-img {
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 40rpx;
}
.detail-per-img > img {
  width: 100%;
  height: 800rpx;
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
  padding-top: 20rpx;
}
.vote-view {
  height: 500rpx;
  width: 100%;
  border-right: 5px solid rgb(209, 209, 0);
  box-sizing: border-box;
}
.scroll-view-item {
  min-height: 500rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scroll-view-item > img {
  width: 200rpx;
  height: 200rpx;
}
.scroll-view-item > span {
  font-size: 24rpx;
}
.scroll-view-item > div.toGift {
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
.contribution {
  width: 100%;
  height: 120rpx;
  line-height: 120rpx;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  position: relative;
}
.contribution img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-left: 20rpx;
  margin-right: 80rpx;
}
.contribution span {
  font-size: 28rpx;
}
.contribution span:nth-child(3) {
  color: rgb(49, 201, 177);
  position: absolute;
  right: 80rpx;
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