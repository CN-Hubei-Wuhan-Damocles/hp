<template>
  <div class="selected">
    <div class="selected-logo">
      <img src="../../../../static/images/logo.jpg" />
    </div>
    <!-- 选择题 -->
    <div class="selected-title">
      <span>当前第7题/共8题</span>
    </div>
    <div class="selected-content">
      <div class="selected-content-title">
        <span>7.你是应届生/非应届(单选题)</span>
      </div>
      <div class="selectedBox">
        <radio-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item, index) in items" :key="key">
            <radio :value="item.value" :checked="item.checked" />
            {{item.type+". "+item.value}}
          </label>
        </radio-group>
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
  name: "selected1",
  data() {
    return {
      items: [{ type: "A", value: "应届" }, { type: "B", value: "非应届" }]
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
      this.globalData.value7 = e.mp.detail.value;
    },
    handleClick() {
      if (this.globalData.value7 == undefined) {
        wx.showToast({
          title: "请选择一个答案",
          icon: "none",
          duration: 2000
        });
      } else {
        wx.navigateTo({
          url: "../select8/main"
        });
      }
    }
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
</style>