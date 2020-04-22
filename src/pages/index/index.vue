<template>
  <div class="homeContainer">
    <!-- 轮播图 -->
    <Swiper
      :background="background"
      :circular="circular"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    ></Swiper>
    <!-- 分类 -->
    <div class="itemWrap">
      <div class="item">
        <div class="item-content" @click="hanleClick1">
          <img src="../../../static/images/active1.png" />
          <span>活动</span>
        </div>
      </div>
      <div class="item">
        <div class="item-content" @click="hanleClick2">
          <img src="../../../static/images/active2.png" />
          <span>问卷</span>
        </div>
      </div>
      <div class="item">
        <div class="item-content" @click="hanleClick3">
          <img src="../../../static/images/active3.png" />
          <span>夏令营</span>
        </div>
      </div>
      <div class="item">
        <div class="item-content" @click="hanleClick4">
          <img src="../../../static/images/active4.png" />
          <span>课程</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "../../components/swiper";
export default {
  name: "index",
  data() {
    return {
      // 轮播图数据
      background: [
        {
          id: 1,
          img:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2923166668,577640199&fm=26&gp=0.jpg"
        },
        {
          id: 2,
          img:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1683936189,3779010630&fm=26&gp=0.jpg"
        },
        {
          id: 3,
          img:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2026380808,732238803&fm=26&gp=0.jpg"
        }
      ],
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    };
  },
  components: {
    Swiper
  },
  methods: {
    hanleClick1(){
      wx.navigateTo({
        url:"../active/main"
      })
    },
    hanleClick2(){
      wx.navigateTo({
        url:"../asked/main"
      })
    },
    hanleClick3(){
      wx.navigateTo({
        url:"../summer/main"
      })
    },
    hanleClick4(){
      wx.navigateTo({
        url:"../course/main"
      })
    }
  },
};
</script>

<style scoped>
.homeContainer {
  background-color: #eeeeee;
  position: fixed;
  height: 100%;
  width: 100%;
}
.itemWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30rpx;
}
.item {
  width: 50%;
  padding: 0rpx 14rpx 0rpx 14rpx;
  box-sizing: border-box;
  height: 350rpx;
  margin-top: 14rpx;
}
.item-content {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(74, 255, 255, 0.4);
  padding: 10rpx;
  box-sizing: border-box;
  text-align: center;
}
.item-content > img {
  width: 100%;
  height: 300rpx;
}
.item-content > span {
  font-size: 32rpx;
}
</style>