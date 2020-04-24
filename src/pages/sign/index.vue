<template>
  <div class="signContainer">
    <div class="sign-title">在线报名</div>
    <!-- 提交表单 -->
    <form @submit="formSubmit">
      <view class="section first">
        <view class="section__title">选手名称</view>
        <input name="user" placeholder="请输入选手名称" type="text" />
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
      array: [
        "全部",
        "北大青鸟鲁广校区",
        "北大青鸟光谷校区",
        "北大青鸟光谷学院",
        "课工场华中直营总校",
        "课工场徐东校区",
        "课工场光谷校区"
      ],
      // 上传图片数据
      currentImg: 0,
      arrImg: [],
      // base64图片转码数据
      toBaseImg: []
    };
  },
  methods: {
    // 提交
    formSubmit(e) {
      let user = e.mp.detail.value.user;
      let phone = e.mp.detail.value.phone;
      let userReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/; //中文、英文、数字但不包括下划线等符号
      let phoneReg = /^1[3456789]\d{9}$/; // 11位数字手机号
      // 图片转码
      let imgs = this.arrImg;
      imgs.map(item => {
        this.urlTobase64(item);
      });
      if (user == "") {
        wx.showToast({
          title: "用户名不可以为空",
          icon: "none",
          duration: 2000
        });
      } else {
        if (!userReg.test(user)) {
          wx.showToast({
            title: "用户名不可以包含符号",
            icon: "none",
            duration: 2000
          });
        } else {
          if (phone == "") {
            wx.showToast({
              title: "手机号不可为空",
              icon: "none",
              duration: 2000
            });
          } else {
            if (!phoneReg.test(phone)) {
              wx.showToast({
                title: "手机号有误",
                icon: "none",
                duration: 2000
              });
            } else {
              e.mp.detail.value.imgs = this.toBaseImg;
              console.log(e.mp.detail.value);
            }
          }
        }
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
          base64 = "data:image/jpeg;base64," + base64;
          //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
          _this.toBaseImg.push(base64);
        }
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