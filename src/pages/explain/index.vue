<template>
  <div class="explainWrap">
    <div class="explain-top">
      <img src="../../../static/images/explain.jpg" />
    </div>
    <div class="explain-content">
      <div>
        <div v-html="content"></div>
      </div>
    </div>
    <div class="explain-bottom">
      <img src="../../../static/images/explain2.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "explain",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    // 页面接口数据
    getHomeData() {
      this.$fly
        .post(this.$api.index, {
          activityId: 1
        })
        .then(res => {
          //   console.log(res.data.data.hdActivity);
          let data = res.data.data.hdActivity;
          this.content = data.introduction;
        });
    }
  },
  onLoad() {
    this.getHomeData();
  }
};
</script>

<style scoped>
.explainWrap {
  background-color: rgb(238, 238, 238);
}
.explain-top {
  padding: 30rpx;
}
.explain-top > img {
  width: 100%;
  height: 230rpx;
}
.explain-content {
  padding: 10rpx 30rpx;
}
.explain-content > div {
  background-color: #ffffff;
  font-size: 32rpx;
  color: #333333;
  padding: 80rpx 30rpx;
  line-height: 50rpx;
  text-align: justify;
  letter-spacing: 2rpx;
}
.explain-bottom {
  margin-top: 30rpx;
}
.explain-bottom > img {
  width: 100%;
  height: 200rpx;
}
</style>