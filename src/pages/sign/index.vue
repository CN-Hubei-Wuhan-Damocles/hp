<template>
  <div class="signContainer">
    <div class="sign-title">在线报名</div>
    <!-- 提交表单 -->
    <form @submit="formSubmit">
      <view class="section first">
        <view class="section__title">选手名称</view>
        <input name="input" placeholder="请输入选手名称" type="text" />
      </view>
      <view class="section">
        <view class="section__title">手机号</view>
        <input name="phone" type="number" placeholder="请输入手机号" />
      </view>
      <view class="section">
        <view class="section__title">分组</view>
        <picker @change="bindPickerChange" :value="index" :range="array" name="select">
          <view class="picker">{{array[index]}}</view>
          <img src="../../../static/tabs/bottom.png" />
        </picker>
      </view>
      <view class="section last">
        <view class="section__title">选手描述</view>
        <textarea placeholder="请输入选手描述" name="textArea" />
      </view>
      <!-- 图片上传 -->
      <div class="signImg">
        <div class="signImg-title">上传选手图片(1-3张)</div>
        <div class="sign-img" @click="signImg">
          <img src="../../../static/tabs/jiahao.png" />
        </div>
      </div>
      <view class="btn-area">
        <button formType="submit" type="primary">提交</button>
      </view>
    </form>
  </div>
</template>

<script>
export default {
  name: "sign",
  data() {
    return {
      index: 0,
      array: [
        "全部",
        "北大青鸟鲁广校区",
        "北大青鸟光谷校区",
        "北大青鸟光谷学院",
        "课工场华中直营总校",
        "课工场徐东校区",
        "课工场光谷校区"
      ]
    };
  },
  methods: {
    formSubmit(e) {
      console.log(e);
    },
    // 提交
    bindPickerChange(e) {
      this.index = e.mp.detail.value;
    },
    // 上传图片
    signImg() {
      wx.chooseImage({
        count: 3
      });
    }
  }
};
</script>

<style scoped>
.signContainer {
  padding: 0rpx 20rpx 0rpx 20rpx;
  font-size: 32rpx;
}
.sign-title {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid #eeeeee;
  color: #738973;
  font-weight: bold;
  text-align: center;
}
.section {
  display: flex;
  align-items: center;
  padding: 15rpx 0rpx;
}
.first {
  margin-top: 15rpx;
}
.section__title {
  width: 25%;
  color: #9aa7c2;
}
.section > input,
.section > picker,
.section > textarea {
  border: 1px solid #cccccc;
  height: 80rpx;
  width: 68%;
  font-size: 28rpx;
  padding-left: 10rpx;
  text-indent: 0.2em;
  background-color: rgb(250, 251, 253);
  color: #999;
  line-height: 80rpx;
}
.section > picker {
  font-size: 32rpx;
  position: relative;
}
.section img {
  width: 30rpx;
  height: 30rpx;
  position: absolute;
  right: 25rpx;
  top: 27rpx;
}
.section > textarea {
  height: 200rpx;
  line-height: normal;
  padding-top: 25rpx;
}
.last {
  align-items: flex-start;
}
.last > .section__title {
  margin-top: 20rpx;
}
.signImg {
  margin-top: 40rpx;
}
.signImg-title {
  color: #b3b3b3;
}
.sign-img {
  margin-top: 20rpx;
  width: 140rpx;
  height: 140rpx;
  border: 1px dashed #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sign-img > img {
  width: 70rpx;
  height: 70rpx;
}
.btn-area {
  margin-top: 100rpx;
}
</style>