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
        <input name="user" v-model="user" />
      </view>
      <view class="section">
        <view class="section__title">
          <img src="../../../../static/tabs/dianhua.png" />电话：
        </view>
        <input name="phone" v-model="phone" />
      </view>
      <view class="section section_gap sex">
        <view class="section__title">
          <img src="../../../../static/tabs/weibiaoti--.png" />性别：
        </view>
        <radio-group name="radio" @change="radioChange">
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
        <picker mode="date" start="1990-06-30" end="2020-06-30" @change="bindDateChange">
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
      date: "--",
      user: "",
      phone: null,
      sex: ""
    };
  },
  methods: {
    formSubmit() {
      let userReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/; //中文、英文、数字但不包括下划线等符号
      let phoneReg = /^1[3456789]\d{9}$/; // 11位数字手机号
      let date = new Date();
      let newYear = date.getFullYear();
      if (this.user == "") {
        wx.showToast({
          title: "姓名不可以为空",
          icon: "none",
          duration: 2000
        });
      } else if (!userReg.test(this.user)) {
        wx.showToast({
          title: "用户名不可以包含符号",
          icon: "none",
          duration: 2000
        });
      } else if (this.phone == null || this.phone == "") {
        wx.showToast({
          title: "手机号不可为空",
          icon: "none",
          duration: 2000
        });
      } else if (!phoneReg.test(this.phone)) {
        wx.showToast({
          title: "手机号有误",
          icon: "none",
          duration: 2000
        });
      } else if (this.sex == "") {
        wx.showToast({
          title: "性别不可为空",
          icon: "none",
          duration: 2000
        });
      } else if (this.dateYear == "----") {
        wx.showToast({
          title: "请选择出生日期",
          icon: "none",
          duration: 2000
        });
      } else if (newYear - this.dateYear < 16) {
        wx.showToast({
          title: "您的年龄小于16岁",
          icon: "none",
          duration: 2000
        });
      } else {
        let name = this.user; // 姓名
        let coursecheckboxs = this.globalData.value4; // 选择我们学校的原因
        let whychoose = this.globalData.value4_text || "";
        let course = this.globalData.value1; // 选择的课程
        let checkboxs = this.globalData.value2; // 最看重哪些方面
        let qita = this.globalData.value2_text || "";
        let ordius = this.globalData.value3; // 报名渠道
        let why = this.globalData.value3_text || "";
        let opinion = this.globalData.value5; // 想要获得什么改变
        let zxordius = this.globalData.value6; // 对咨询是否满意
        let yuanyin = this.globalData.value6_text || ""; // 不满意的原因
        let professors = this.globalData.value8; //学历
        let isfresh = this.globalData.value7; //是否是应届生
        let sex = this.sex == "男" ? "0" : "1"; // 性别
        let born = this.dateYear + "-" + this.dateMonth + "-" + this.date; // 出生日期
        let tel = Number(this.phone); // 电话
        this.$fly
          .post(this.$api.asked, {
            questionnaireId: 2,
            name: name,
            cause: coursecheckboxs + ":" + whychoose,
            lesson: course,
            advantage: checkboxs + ":" + qita,
            place: ordius + ":" + why,
            changee: opinion,
            satisfaction: zxordius,
            negativeComment: yuanyin,
            education: professors,
            current: isfresh,
            sex: sex,
            birthday: born,
            tel: tel
          })
          .then(res => {
            if (res.data.success) {
              // 初始化
              this.user = "";
              this.phone = "";
              this.dateYear = "----";
              this.dateMonth = "--";
              this.date = "--";
              wx.showToast({
                title: "提交成功",
                icon: "success",
                duration: 2000
              });
              setTimeout(() => {
                wx.reLaunch({
                  url: "../../luck/main"
                });
              }, 500);
            } else {
              wx.showToast({
                title: res.data.message,
                icon: "none",
                duration: 2000
              });
            }
          });
      }
    },
    // 出生日期
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
    },
    // 性别
    radioChange(e) {
      this.sex = e.target.value;
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