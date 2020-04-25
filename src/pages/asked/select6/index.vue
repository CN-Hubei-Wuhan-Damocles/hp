<template>
  <div class="selected">
    <div class="selected-logo">
      <img src="../../../../static/images/logo.jpg" />
    </div>
    <!-- 选择题 -->
    <div class="selected-title">
      <span>当前第6题/共8题</span>
    </div>
    <div class="selected-content">
      <div class="selected-content-title">
        <span>6.你对咨询接待流程是否满意？(单选题)</span>
      </div>
      <div class="selectedBox">
        <radio-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item, index) in items" :key="key">
            <radio :value="item.value" :checked="item.checked" />
            {{item.type+". "+item.value}}
          </label>
        </radio-group>
        <!-- 其他输入框 -->
        <div class="selected-text" v-if="isOther">
          <textarea placeholder="请提出您宝贵的意见" name="textarea" v-model.lazy="otherText" />
        </div>
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
  name: "selected3",
  data() {
    return {
      items: [
        { type: "A", value: "非常满意" },
        { type: "B", value: "满意" },
        { type: "C", value: "一般" },
        { type: "D", value: "不满意(原因必填)" }
      ],
      // 其他文本控制数据
      isOther: false,
      otherText: ""
    };
  },
  methods: {
    radioChange(e) {
      //初始化单选框;
      this.items.map(item => {
        item.checked = false;
      });
      // 切换勾选状态
      let index = this.items.findIndex(item => item.value == e.mp.detail.value);
      this.items[index].checked = true;
      this.globalData.value6 = e.mp.detail.value;
      // 判断选项是否为不满意
      if (e.mp.detail.value == "不满意(原因必填)") {
        this.isOther = true;
      } else {
        // 文本数据初始化
        this.isOther = false;
      }
    },
    handleClick() {
      //其他选项的文本内容清空;
      if (this.globalData.value6 == undefined) {
        wx.showToast({
          title: "请选择一个答案",
          icon: "none",
          duration: 2000
        });
      } else {
        if (this.globalData.value6 == "不满意(原因必填)") {
          if (this.otherText == "") {
            wx.showToast({
              title: "请输入原因",
              icon: "none",
              duration: 2000
            });
          } else {
            this.globalData.value6_text = this.otherText;
            wx.navigateTo({
              url: "../select7/main"
            });
          }
        } else {
          wx.navigateTo({
            url: "../select7/main"
          });
        }
      }
    }
  },
  onShow() {
    // 清空文本框内容
    delete this.globalData.value6_text;
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
  height: 250rpx;
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
}
.selectedBox {
  padding: 20rpx 40rpx;
}
.radio-group {
  border: 1px solid #cccccc;
}
.radio {
  display: flex;
  align-items: center;
  height: 70rpx;
  border-bottom: 1px solid #cccccc;
  padding-left: 10rpx;
  box-sizing: border-box;
}
.toNext {
  margin-top: 10rpx;
  margin-bottom: 30rpx;
}
.toNext > button {
  width: 50%;
}
.selected-text {
  padding: 15rpx;
}
.selected-text > textarea {
  border: 1px solid #cccccc;
  width: 100%;
  height: 100rpx;
  box-sizing: border-box;
  border-radius: 15rpx;
  font-size: 28rpx;
  padding: 15rpx 20rpx;
}
</style>