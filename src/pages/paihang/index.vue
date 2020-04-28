<template>
  <div class="paihangContainer">
    <!-- 倒计时 -->
    <div class="lastTime">
      <span>{{ endTime }} 结束</span>
      <span>
        <span>剩余</span>
        <CTime :endTime="endTime" :endText="endText" :callback="callback"></CTime>
      </span>
    </div>
    <!-- 票数排行榜 -->
    <div class="vote-rank">
      <div class="vote-rank-title">票数排行榜</div>
      <div class="rank">
        <div class="rank-top">
          <div class="rank-second">
            <span>NO.2</span>
            <img :src="second.img" />
            <span>{{ second.name }}</span>
            <span>{{ second.count }}票</span>
          </div>
          <div class="rank-first">
            <img src="../../../static/images/best.png" />
            <img :src="first.img" />
            <span>{{ first.name }}</span>
            <span>
              <span>{{ first.count }}</span>票
            </span>
          </div>
          <div class="rank-third">
            <span>NO.3</span>
            <img :src="third.img" />
            <span>{{ third.name }}</span>
            <span>{{ third.count }}票</span>
          </div>
        </div>
        <ul class="rank-ul">
          <li v-for="(item,index) in newList" class="rankList" :key="key">
            <div class="rank-img">
              <img :src="item.img" />
            </div>
            <div class="rank-msg">
              <span>{{ item.name }}</span>
              <span>{{ item.count }} 票</span>
            </div>
            <span class="ranking">{{ index+4 }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CTime from "../../components/cTime";
export default {
  name: "paihang",
  components: {
    CTime
  },
  data() {
    return {
      // 倒计时数据
      endTime: "2020-11-30 00:00:00",
      endText: "活动已结束",
      // 排行数据
      list: [
        {
          id: 1,
          img: "../../static/images/item1.png",
          name: "罗仪",
          count: 33,
          rank: 6,
          gift: 0,
          view: 1065
        },
        {
          id: 2,
          img: "../../static/images/item2.png",
          name: "k9506张锦泽",
          count: 7,
          rank: 15,
          gift: 0,
          view: 253
        },
        {
          id: 3,
          img: "../../static/images/item3.png",
          name: "k9507骆鑫",
          count: 0,
          rank: 20,
          gift: 0,
          view: 100
        },
        {
          id: 4,
          img: "../../static/images/item4.png",
          name: "k9906班高铁言",
          count: 2,
          rank: 12,
          gift: 0,
          view: 536
        },
        {
          id: 5,
          img: "../../static/images/item1.png",
          name: "罗仪",
          count: 33,
          rank: 6,
          gift: 0,
          view: 1065
        },
        {
          id: 6,
          img: "../../static/images/item2.png",
          name: "k9506张锦泽",
          count: 7,
          rank: 15,
          gift: 0,
          view: 253
        },
        {
          id: 7,
          img: "../../static/images/item3.png",
          name: "k9507骆鑫",
          count: 0,
          rank: 20,
          gift: 0,
          view: 100
        },
        {
          id: 8,
          img: "../../static/images/item4.png",
          name: "k9906班高铁言",
          count: 2,
          rank: 12,
          gift: 0,
          view: 536
        },
        {
          id: 9,
          img: "../../static/images/item1.png",
          name: "罗仪",
          count: 33,
          rank: 6,
          gift: 0,
          view: 1065
        },
        {
          id: 10,
          img: "../../static/images/item2.png",
          name: "k9506张锦泽",
          count: 7,
          rank: 15,
          gift: 0,
          view: 253
        }
      ],
      first: null,
      second: null,
      third: null,
      newList: []
    };
  },
  methods: {
    callback() {
      this.isEnd = false;
    },
    getData() {
      this.$fly
        .post(this.$api.index, {
          activityId: 1
        })
        .then(res => {
          // console.log(res.data.data.hdActivity);
          let data = res.data.data.hdActivity;
          this.endTime = data.end;
        });
    }
  },
  onLoad() {
    this.getData();
    this.first = this.list[0];
    this.second = this.list[1];
    this.third = this.list[2];
    this.newList = this.list.filter((item, index) => index > 2);
  }
};
</script>

<style scoped>
.paihangContainer {
  background-color: rgb(238, 238, 238);
  padding: 0rpx 20rpx 15rpx 20rpx;
  font-size: 30rpx;
  color: rgb(117, 134, 150);
}
.lastTime {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0rpx;
}
.lastTime > span:nth-child(2) {
  display: inline-block;
  margin-top: 20rpx;
}
.vote-rank {
  background-color: #fff;
}
.vote-rank-title {
  color: white;
  background-color: rgb(49, 201, 178);
  padding: 20rpx 0rpx;
  text-align: center;
}
.rank {
  background-color: #fff;
  padding: 0rpx 10rpx;
}
.rank-top {
  width: 100%;
  height: 400rpx;
  display: flex;
  border-bottom: 1px solid #eeeeee;
}
.rank-top > div {
  flex: 1;
}
.rank-first,
.rank-second,
.rank-third {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rank-first > img {
  width: 160rpx;
  height: 80rpx;
}
.rank-first > img:nth-child(2) {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  border: 2px solid rgb(254, 222, 134);
  margin-top: -21rpx;
  margin-bottom: 20rpx;
}
.rank-second > img,
.rank-third > img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin: 15rpx 0rpx 30rpx 0rpx;
}
.rank-second > span:nth-child(1),
.rank-third > span:nth-child(1) {
  color: rgb(252, 197, 54);
}
.rank-first > span:nth-child(3) {
  font-size: 36rpx;
  font-weight: bold;
}
.rank-first > span:nth-child(4),
.rank-second > span:nth-child(4),
.rank-third > span:nth-child(4) {
  color: rgb(49, 201, 178);
  display: inline-block;
  margin-top: 15rpx;
}
.rankList {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  padding: 40rpx 0rpx 20rpx 0rpx;
  position: relative;
}
.rank-img {
  flex: 1;
}
.rank-img > img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  float: right;
}
.rank-msg {
  flex: 4;
  display: flex;
  flex-direction: column;
  padding-left: 20rpx;
}
.rank-msg > span:nth-child(2) {
  font-size: 24rpx;
  display: inline-block;
  margin-top: 10rpx;
}
.ranking {
  position: absolute;
  right: 70rpx;
}
.rank-ul > li:last-child > .ranking {
  right: 65rpx;
}
</style>