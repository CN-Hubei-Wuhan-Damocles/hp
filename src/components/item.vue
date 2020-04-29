<template>
  <div class="itemContainer" @click="toDetail(id)">
    <img :src="img" />
    <span>{{ name }}</span>
    <span>{{ count }}票</span>
    <button type="default">投票</button>
    <div class="itemId">
      <span>编号:{{ id }}</span>
    </div>
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
  position: relative;
}
.itemContainer img {
  width: 100%;
  height: 380rpx;
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
.itemContainer > span {
  margin-left: 16rpx;
  display: inline-block;
  margin-top: 10rpx;
}
.itemContainer span:nth-child(3) {
  color: rgb(49, 201, 177);
}
.itemId {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  z-index: 99;
  width: 140rpx;
  height: 60rpx;
  line-height: 60rpx;
  background-color: rgb(0, 0, 0);
  color: white;
  opacity: 0.4;
  text-align: center;
}
</style>
