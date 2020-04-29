<template>
  <div>
    <!-- 选手信息 -->
    <div class="detailTop" id="giftPer">
      <div class="detail-img">
        <img :src="detailObj.coverImg"/>
      </div>
      <div class="detail-name">{{ detailObj.name }}</div>
    </div>
    <!-- 数据展示 -->
    <div class="detail-show">
      <!-- 排名 -->
      <div>
        <span>{{ detailObj.rank }}</span>
        <span>排名</span>
      </div>
      <!-- 票数 -->
      <div>
        <span>{{ detailObj.ticket }}</span>
        <span>票数</span>
      </div>
      <!-- 礼物 -->
      <div>
        <span>{{ detailObj.gift }}</span>
        <span>礼物</span>
      </div>
      <!-- 浏览量 -->
      <div>
        <span>{{ detailObj.browse }}</span>
        <span>浏览量</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "per",
  props: ["detailObj"]
};
</script>

<style scoped>
.detailTop {
  margin: 0rpx 0rpx 0rpx -20rpx;
  display: flex;
  flex-direction: column;
  width: calc(100% + 40rpx);
  height: 300rpx;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.detail-img {
  width: 180rpx;
  height: 180rpx;
}
.detail-img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.detail-name {
  margin-top: 14rpx;
}
.detail-show {
  width: 100%;
  height: 150rpx;
  background-color: rgb(49, 201, 177);
  color: white;
  display: flex;
  border-radius: 5rpx;
}
.detail-show > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>