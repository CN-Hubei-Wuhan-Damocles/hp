<template>
  <div>
    <!-- 轮播图 -->
    <Swiper
      :background="background"
      :circular="circular"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    ></Swiper>
    <!-- 热门活动 -->
    <div class="hotWrap">
      <div class="hotTitle">热门活动</div>
      <ul class="hotUl">
        <li class="hot" v-for="item in arr" :key="key" @click="toTabbar">
          <span>{{ item.id }}</span>
          <span>{{ item.name}}</span>
          <span>{{ item.count}}</span>
          <img src="../../../static/images/remen.png" alt />
        </li>
      </ul>
    </div>
    <!-- 首页球 -->
    <div class="home" @click="handleClick">首页</div>
  </div>
</template>

<script>
import Swiper from "../../components/swiper";
export default {
  name: "active",
  components: {
    Swiper
  },
  data() {
    return {
      // 轮播图
      background: [
        {
          id: 1,
          img:
            "http://img1.imgtn.bdimg.com/it/u=3271995388,926823819&fm=26&gp=0.jpg"
        },
        {
          id: 2,
          img:
            "http://img0.imgtn.bdimg.com/it/u=2519912085,3408289831&fm=26&gp=0.jpg"
        },
        {
          id: 3,
          img:
            "http://img3.imgtn.bdimg.com/it/u=107019546,5893311&fm=26&gp=0.jpg"
        }
      ],
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      // 热门
      arr: [{ id: 1, name: "宏鹏教育程序员美...", count: 6760 }]
    };
  },
  methods: {
    handleClick() {
      wx.navigateTo({
        url: "../index/main"
      });
    },
    toTabbar() {
      wx.switchTab({
        url: "../home/main"
      });
    },
    getActiveData() {
      this.$fly.post(this.$api.active).then(res => {
        let data = res.data.data[0];
        console.log(res.data.data[0]);
        // 活动数据
        if (data.name.length > 8) {
          data.name = data.name.substring(0, 8) + "...";
        }
        this.arr[0].name = data.name;
        this.arr[0].count = data.browse;
      });
    }
  },
  onLoad() {
    this.getActiveData();
  }
};
</script>

<style scoped>
.hot {
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  height: 80rpx;
  line-height: 80rpx;
}
.hotTitle {
  height: 60rpx;
  line-height: 60rpx;
  padding-left: 14rpx;
  margin-top: 20rpx;
  font-size: 32rpx;
}
.hotUl {
  padding: 0rpx 14rpx 0rpx 14rpx;
}
.hot img {
  width: 40rpx;
  height: 40rpx;
  float: right;
  margin-right: 40rpx;
  margin-top: 20rpx;
}
.hot span {
  font-size: 32rpx;
}
.hot span:nth-child(1) {
  color: orange;
}
.hot span:nth-child(2) {
  margin-left: 50rpx;
}
.hot span:nth-child(3) {
  color: #cccccc;
  margin-left: 25rpx;
}
.home {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 1px solid rgba(74, 255, 255, 0.5);
  position: fixed;
  bottom: 100rpx;
  right: 0rpx;
  font-size: 24rpx;
  color: #cccccc;
  line-height: 80rpx;
  text-align: center;
}
</style>