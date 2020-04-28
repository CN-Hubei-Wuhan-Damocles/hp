<template>
  <div class="selected">
    <div class="selected-logo">
      <img src="../../../../static/images/logo.jpg" />
    </div>
    <!-- 提交表单 -->
    <form @submit="formSubmit">
      <div class="form-title">
        <span>*</span>
        <span>请留下你的联系方式，您提交完问卷后可参与抽奖，中奖后工作人员会第一时间联系您！</span>
      </div>
      <view class="section">
        <view class="section__title">
          <img src="../../../../static/tabs/xingming.png" />姓名：
        </view>
        <input name="user" />
      </view>
      <view class="section">
        <view class="section__title">
          <img src="../../../../static/tabs/dianhua.png" />电话：
        </view>
        <input name="phone" />
      </view>
      <view class="section section_gap sex">
        <view class="section__title">
          <img src="../../../../static/tabs/weibiaoti--.png" />性别：
        </view>
        <radio-group name="radio">
          <label>
            <radio value="男" />男
          </label>
          <label>
            <radio value="女" />女
          </label>
        </radio-group>
      </view>
      <view class="section">
        <view class="section__title">
          <img src="../../../../static/tabs/shengri.png" />出生日期：
        </view>
        <picker mode="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
          <view class="picker">
            {{ dateYear }}年 {{ dateMonth }}月 {{ date }}日
            <img
              src="../../../../static/tabs/bottom.png"
            />
          </view>
        </picker>
      </view>
      <view class="btn-area">
        <button formType="submit" type="primary">提交</button>
      </view>
    </form>
  </div>
</template>

<script>
export default {
  name: "selected1",
  data() {
    return {
      dateYear: "----",
      dateMonth: "--",
      date: "--"
    };
  },
  methods: {
    formSubmit(e) {
      console.log(this.globalData);
      console.log(e.mp.detail.value);
      console.log(this.dateYear + this.dateMonth + this.date);
      wx.showToast({
        title: "提交成功",
        icon: "success",
        duration: 2000
      });
      setTimeout(() => {
        wx.reLaunch({
          url: "../../luck/main"
        });
      }, 2000);
    },
    bindDateChange(e) {
      let value = e.mp.detail.value;
      let newdate = new Date(value);
      let year = newdate.getFullYear();
      let month = newdate.getMonth();
      let day = newdate.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      this.dateYear = year;
      this.dateMonth = month;
      this.date = day;
    }
  }
};
</script>

<style scoped>
.selected {
  font-size: 28rpx;
  color: #222;
}
.selected-logo > img {
  width: 100%;
  height: 250rpx;
}
.btn-area > button {
  width: 50%;
}
.section {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  margin-bottom: 30rpx;
}
.form-title {
  padding: 30rpx 20rpx;
  letter-spacing: 2rpx;
}
.form-title > span:first-child {
  color: red;
}
.section img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}
.sex img {
  width: 50rpx;
  height: 50rpx;
  margin-left: -10rpx;
}
.section__title {
  display: flex;
  align-items: center;
}
.section > input {
  width: 70%;
  border: 1px solid #cccccc;
  height: 60rpx;
  margin-left: 20rpx;
  border-radius: 5rpx;
  padding-left: 20rpx;
}
.section label {
  margin-left: 30rpx;
}
.section .picker {
  border: 1px solid #cccccc;
  height: 60rpx;
  line-height: 60rpx;
  margin-left: 20rpx;
  padding-left: 10rpx;
  width: 410rpx;
  box-sizing: border-box;
  position: relative;
}
.picker > img {
  position: absolute;
  right: 60rpx;
  top: 10rpx;
}
</style>