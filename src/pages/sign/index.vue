<template>
  <div class="signContainer">
    <div class="sign-title">在线报名</div>
    <!-- 提交表单 -->
    <form @submit="formSubmit">
      <view class="section first">
        <view class="section__title">选手名称</view>
        <input name="user" placeholder="请输入选手名称" type="text" v-model="name" />
      </view>
      <view class="section">
        <view class="section__title">手机号</view>
        <input name="phone" type="number" placeholder="请输入手机号" v-model="phone" />
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
        <textarea placeholder="请输入选手描述" name="textArea" v-model="text" />
      </view>
      <!-- 图片上传 -->
      <div class="signImg">
        <div class="signImg-title">上传选手图片(1-3张)</div>
        <div class="signImgs">
          <div
            class="sign-showImg"
            v-for="(item,index) in arrImg"
            :key="key"
            v-if="currentImg>index"
            @click="showImg(index)"
          >
            <img :src="item" />
          </div>
          <div class="sign-img" @click="signImg" v-if="currentImg!=3">
            <img src="../../../static/tabs/jiahao.png" />
          </div>
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
      array: ["全部"],
      groupId: [null], // 分组id
      // 上传图片数据
      currentImg: 0,
      arrImg: [],
      // base64图片转码数据
      toBaseImg: [],
      name: null, //用户名
      phone: null, // 手机号
      text: null, // 描述信息
      userInfo: null // 登录判断
    };
  },
  methods: {
    // 提交
    formSubmit() {
      let user = this.name;
      let phone = Number(this.phone);
      let userReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/; //中文、英文、数字但不包括下划线等符号
      let phoneReg = /^1[3456789]\d{9}$/; // 11位数字手机号
      let extend;
      if (this.userInfo == 1) {
        extend = 0;
      } else if (this.userInfo == 0) {
        extend = 1;
      }
      // 正则验证
      if (user == "") {
        wx.showToast({
          title: "用户名不可以为空",
          icon: "none",
          duration: 2000
        });
      } else if (!userReg.test(user)) {
        wx.showToast({
          title: "用户名不可以包含符号",
          icon: "none",
          duration: 2000
        });
      } else if (phone == "") {
        wx.showToast({
          title: "手机号不可为空",
          icon: "none",
          duration: 2000
        });
      } else if (!phoneReg.test(phone)) {
        wx.showToast({
          title: "手机号有误",
          icon: "none",
          duration: 2000
        });
      } else if (this.arrImg.length == 0) {
        wx.showToast({
          title: "至少上传一张图片",
          icon: "none",
          duration: 2000
        });
      } else {
        this.$fly
          .post(this.$api.sign, {
            activityId: 1,
            name: user,
            tel: phone,
            describes: this.text,
            pics: JSON.stringify(this.toBaseImg),
            extend1: extend,
            groupId: this.groupId[this.index]
          })
          .then(res => {
            // code等于0时 操作成功
            if (res.data.code == 0) {
              console.log(res);
              // 数据初始化
              this.index = 0;
              this.currentImg = 0;
              this.arrImg = [];
              this.toBaseImg = [];
              this.name = null;
              this.phone = null;
              this.text = null;
              // 判断报名是否需要审核
              if (this.userInfo == 1) {
                wx.showModal({
                  title: "提交成功",
                  content: "本活动报名须进行资料审核，请您耐心等待",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      // wx.switchTab({
                      //   url: "../home/main"
                      // });
                    }
                  }
                });
              }
              if (this.userInfo == 0) {
                wx.showModal({
                  title: "提示",
                  content: "报名成功",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      // wx.switchTab({
                      //   url: "../home/main"
                      // });
                    }
                  }
                });
              }
            } else {
              wx.showToast({
                title: response.data.msg,
                icon: "none",
                duration: 2000
              });
            }
          });
      }
    },
    // 分组选择
    bindPickerChange(e) {
      this.index = e.mp.detail.value;
    },
    // 上传图片,显示图片
    signImg() {
      let _this = this;
      wx.chooseImage({
        count: 1,
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          _this.arrImg.push(tempFilePaths[0]); // 数组每一项要为字符串
          // 图片转码
          _this.urlTobase64(tempFilePaths[0]);
          _this.currentImg++;
          if (_this.currentImg == 3) {
            wx.showModal({
              title: "提示",
              content: "照片最多上传3张！"
            });
          }
        }
      });
    },
    // 图片操作
    showImg(i) {
      let _this = this;
      wx.showActionSheet({
        itemList: ["预览", "删除"],
        success(res) {
          if (res.tapIndex == 0) {
            wx.previewImage({
              urls: _this.arrImg,
              current: _this.arrImg[i]
            });
          } else if (res.tapIndex == 1) {
            _this.arrImg.splice(i, 1);
            _this.currentImg--;
          }
        },
        fail(res) {
          // console.log(res.errMsg);
        }
      });
    },
    // 图片临时路径转base64
    urlTobase64(url) {
      let _this = this;
      wx.request({
        url: url,
        responseType: "arraybuffer", //最关键的参数，设置返回的数据格式为arraybuffer
        success: res => {
          //把arraybuffer转成base64
          let base64 = wx.arrayBufferToBase64(res.data);
          //不加上这串字符，在页面无法显示的哦
          base64 = "data:image/png;base64," + base64;
          //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
          _this.toBaseImg.push({ img: base64 });
        }
      });
    },
    // 报名判断--安全验证
    isLogin() {
      this.$fly
        .post(this.$api.isLogin, {
          activityId: 1
        })
        .then(res => {
          this.userInfo = res.data.data.hdActivity.audit;
          res.data.data.groupList.map(item => {
            this.array.push(item.name);
            this.groupId.push(item.id);
          });
        });
    }
  },
  onLoad() {
    this.isLogin();
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
.signImgs {
  margin-top: 20rpx;
  display: flex;
}
.signImg-title {
  color: #b3b3b3;
}
.sign-showImg {
  width: 110rpx;
  height: 110rpx;
  margin-right: 20rpx;
  background-color: gray;
}
.sign-showImg > img {
  width: 100%;
  height: 100%;
}
.sign-img {
  width: 110rpx;
  height: 110rpx;
  border: 1px dashed #b3b3b3;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.sign-img > img {
  width: 70rpx;
  height: 70rpx;
}
.btn-area {
  margin-top: 100rpx;
}
</style>