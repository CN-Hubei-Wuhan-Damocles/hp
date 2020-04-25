<template>
  <div class="selected">
    <div class="selected-logo">
      <img src="../../../../static/images/logo.jpg" />
    </div>
    <!-- 选择题 -->
    <div class="selected-title">
      <span>当前第2题/共8题</span>
    </div>
    <div class="selected-content">
      <div class="selected-content-title">
        <span>2.你选择学校最看重哪些方面？ (多选)</span>
      </div>
      <div class="selectedBox">
        <checkbox-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item, index) in items" :key="key">
            <checkbox :value="item.value" :checked="item.checked" />
            {{item.type+". "+item.value}}
          </label>
        </checkbox-group>
        <!-- 其他输入框 -->
        <div class="selected-text" v-if="isOther">
          <textarea placeholder="请输入..." name="textarea" v-model.lazy="otherText" />
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
  name: "selected2",
  data() {
    return {
      items: [
        { type: "A", value: "教学质量" },
        { type: "B", value: "就业保障" },
        { type: "C", value: "品牌知名度" },
        { type: "D", value: "课程设置" },
        { type: "E", value: "口碑美誉度" },
        { type: "F", value: "办学规模" },
        { type: "G", value: "校园环境" },
        { type: "H", value: "住宿条件" },
        { type: "I", value: "性价比" },
        { type: "J", value: "其他" }
      ],
      // 其他文本控制数据
      isOther: false,
      otherText: ""
    };
  },
  methods: {
    radioChange(e) {
      let arrValue = e.mp.detail.value;
      this.globalData.value2 = arrValue;
      // 初始化多选框
      this.items.map(item => {
        item.checked = false;
      });
      // 切换勾选状态
      arrValue.map(item => {
        let i = this.items.findIndex(every => every.value == item);
        this.items[i].checked = true;
      });
      // 判断选项是否包含其他选项
      let index = arrValue.findIndex(item => item == "其他");
      if (index == -1) {
        this.isOther = false;
      } else {
        this.isOther = true;
      }
    },
    handleClick() {
      let arrValue = this.globalData.value2;
      if (arrValue == undefined || arrValue.length == 0) {
        wx.showToast({
          title: "请至少选择一个答案",
          icon: "none",
          duration: 2000
        });
      } else {
        let index = arrValue.findIndex(item => item == "其他");
        if (index == -1) {
          wx.navigateTo({
            url: "../select3/main"
          });
        } else {
          if (this.otherText == "") {
            wx.showToast({
              title: "请输入原因",
              icon: "none",
              duration: 2000
            });
          } else {
            this.globalData.value2_text = this.otherText;
            wx.navigateTo({
              url: "../select3/main"
            });
          }
        }
      }
    }
  },
  onShow() {
    // 清空文本框内容
    delete this.globalData.value2_text;
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