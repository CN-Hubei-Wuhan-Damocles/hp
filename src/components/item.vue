<template>
  <div class="itemContainer" @click="toDetail(id)">
    <img :src="img" />
    <span>{{ name }}</span>
    <span>{{ count }}票</span>
    <button type="default">投票</button>
  </div>
</template>

<script>
export default {
  name: "item",
  props: ["img", "name", "count", "id"],
  methods: {
    toDetail(id) {
      wx.navigateTo({
        url: `../detail/main?id=${id}`
      });
    }
  }
};
</script>

<style scoped>
.itemContainer {
  width: 49%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-size: 32rpx;
  margin-top: 20rpx;
}
.itemContainer img {
  width: 100%;
  height: 350rpx;
}
.itemContainer button {
  width: 90%;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 0rpx;
  color: white;
  background-color: rgb(49, 201, 177);
  display: inline-block;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
}
.itemContainer span {
  margin-left: 16rpx;
  display: inline-block;
  margin-top: 10rpx;
}
.itemContainer span:nth-child(3) {
  color: rgb(49, 201, 177);
}
</style>
