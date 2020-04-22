<template>
  <div>
    <swiper
      class="swiper"
      indicator-dots="true"
      indicator-color="white"
      indicator-active-color="#007AFF"
      :circular="circular"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <block v-for="(item, index) in background" :index="index" :key="key">
        <swiper-item class="swiper-item">
          <image :src="item.img" class="slide-image" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "swiper-template",
  props: ["background", "autoplay", "interval", "duration", "circular"]
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 400rpx;
}
.slide-image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>