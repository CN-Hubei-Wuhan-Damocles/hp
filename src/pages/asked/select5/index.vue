<template>
  <div class="selected">
    <div class="selected-logo">
      <img src="../../../../static/images/logo.jpg" mode="widthFix" />
    </div>
    <!-- 选择题 -->
    <div class="selected-title">
      <span>当前第5题/共8题</span>
    </div>
    <div class="selected-content">
      <div class="selected-content-title">
        <span>5.你希望通过我们的学习获得哪些方面的改变？(必填)[填空题]</span>
      </div>
      <div class="selected-text">
        <textarea placeholder="请提出您宝贵的意见" name="textarea" v-model.lazy="otherText" />
      </div>
      <!-- 下一题 -->
      <div class="toNext">
        <button type="primary" @click="handleClick">下一题</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selected",
  data() {
    return {
      otherText: ""
    };
  },
  methods: {
    handleClick() {
      if (this.otherText == "") {
        wx.showToast({
          title: "请留下您宝贵的意见",
          icon: "none",
          duration: 2000
        });
      } else {
        this.globalData.value5 = this.otherText;
        wx.navigateTo({
          url: "../select6/main"
        });
      }
    }
  },
  onShow() {
    // 初始化
    this.otherText = "";
  }
};
</script>

<style scoped>
.selected {
  font-size: 24rpx;
  color: #222;
}
.selected-logo > img {
  width: 100%;
}
.selected-title {
  height: 80rpx;
  line-height: 80rpx;
  padding-left: 45rpx;
  box-sizing: border-box;
}
.selected-content-title {
  font-size: 28rpx;
  font-weight: bold;
  height: 60rpx;
  line-height: 60rpx;
  padding-left: 20rpx;
  letter-spacing: 2rpx;
}
.toNext {
  margin-top: 20rpx;
  margin-bottom: 30rpx;
}
.toNext > button {
  width: 50%;
}
.selected-text {
  padding: 0rpx 40rpx;
  margin-top: 80rpx;
  margin-bottom: 40rpx;
}
.selected-text > textarea {
  border: 1px solid #cccccc;
  width: 100%;
  height: 250rpx;
  box-sizing: border-box;
  border-radius: 15rpx;
  font-size: 28rpx;
  padding: 30rpx;
}
</style>