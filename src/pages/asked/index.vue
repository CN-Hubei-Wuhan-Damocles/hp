<template>
  <div class="askedWrap">
    <div class="asked-logo">
      <img src="../../../static/images/logo.jpg" mode="widthFix" />
    </div>
    <div class="asked-text">
      <div>
        <span>您好！</span>
        <br />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ text }}</span>
      </div>
    </div>
    <div class="toStart">
      <button type="primary" size="dafault" @click="handleClick">开始问卷调查</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "asked",
  data() {
    return {
      text: `感谢您对武汉宏鹏教育的支持和信任，我们秉承教育改变生活的理念，在我校全体教职员工的努力下，
        已经帮助数万学生，实现了自己的人生理想和学习目标。您的宝贵意见将指导我们在今后的工作中不断努力改进，请务必认真填写！`
    };
  },
  methods: {
    handleClick() {
      // 删除全部选项的数据
      delete this.globalData.value1;
      delete this.globalData.value2;
      delete this.globalData.value3;
      delete this.globalData.value4;
      delete this.globalData.value5;
      delete this.globalData.value6;
      delete this.globalData.value7;
      delete this.globalData.value8;
      wx.navigateTo({
        url: "./select1/main"
      });
    }
  }
};
</script>

<style scoped>
.asked-logo > img {
  width: 100%;
}
.asked-text {
  padding: 30rpx;
}
.asked-text > div {
  border: 1px solid #eeeeee;
  width: 100%;
  border-radius: 10rpx;
  padding: 30rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  letter-spacing: 2rpx;
  text-align: justify;
  color: #b3b3b3;
  box-shadow: 0px 0px 10px 5px #bbb;
}
.toStart {
  margin-top: 20rpx;
}
.toStart > button {
  width: 50%;
}
</style>