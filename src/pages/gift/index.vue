<template>
  <div class="giftContainer">
    <Per :detailObj="giftObj"></Per>
    <!-- 送礼 -->
    <div class="toGift">送礼物加票数</div>
    <!-- 礼物部分 -->
    <div class="gift">
      <div class="giftList">
        <div v-for="item in giftList" :key="key" @click="handleClick(item.giftId)">
          <div class="giftShow" :class="{ active: item.giftId==current }">
            <span>{{ item.name }}</span>
            <img :src="item.img" />
            <!-- <img src="../../../static/images/gift1.png" /> -->
            <div class="giftCount">+{{ item.count }}票</div>
          </div>
        </div>
      </div>
      <div class="giftPrice">
        <div class="gift-left">
          <span>￥</span>
          <span>{{ totalPrice }}</span>
          <span>+{{ totalCount }}票</span>
        </div>
        <div class="gift-right">
          <button type="mini" @click="sub">-</button>
          <input type="text" v-model="num" @blur="onIpt" />
          <button type="mini" @click="add">+</button>
        </div>
      </div>
    </div>
    <!-- 立即送出按钮 -->
    <div class="giftBtn">
      <button type="primary">立即送出</button>
    </div>
  </div>
</template>

<script>
import Per from "../../components/per";
export default {
  name: "gift",
  components: {
    Per
  },
  data() {
    return {
      // 分组数据
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
        }
      ],
      giftObj: null,
      // 礼物数据
      giftList: [
        {
          giftId: 1,
          name: "棒棒糖",
          img: "../../static/images/gift1.png",
          price: "6",
          count: 20
        },
        {
          giftId: 2,
          name: "花花",
          img: "../../static/images/gift2.png",
          price: "18",
          count: 65
        },
        {
          giftId: 3,
          name: "么么哒",
          img: "../../static/images/gift3.png",
          price: "25",
          count: 99
        },
        {
          giftId: 4,
          name: "666",
          img: "../../static/images/gift4.png",
          price: "50",
          count: 240
        },
        {
          giftId: 5,
          name: "告白气球",
          img: "../../static/images/gift5.png",
          price: "98",
          count: 550
        },
        {
          giftId: 6,
          name: "小心心",
          img: "../../static/images/gift6.png",
          price: "168",
          count: 1000
        },
        {
          giftId: 7,
          name: "神灯",
          img: "../../static/images/gift7.png",
          price: "258",
          count: 2188
        },
        {
          giftId: 8,
          name: "皇冠",
          img: "../../static/images/gift8.png",
          price: "328",
          count: 2888
        },
        {
          giftId: 9,
          name: "宝箱",
          img: "../../static/images/gift9.png",
          price: "648",
          count: 6888
        }
      ],
      current: 1,
      giftListObj: null,
      // 礼物数量
      num: 1,
      totalPrice: null,
      totalCount: null
    };
  },
  computed: {},
  methods: {
    handleClick(id = 1) {
      this.current = id;
      this.giftListObj = this.giftList.find(
        item => item.giftId == this.current
      );
      this.num = 1;
      this.changeTotal();
    },
    sub() {
      this.num--;
      if (this.num < 1) {
        this.num = 1;
        wx.showModal({
          title: "提示",
          content: "送礼物数量不能小于1"
        });
      } else {
        this.changeTotal();
      }
    },
    add() {
      this.num++;
      if (this.num > 99) {
        this.num = 99;
        wx.showModal({
          title: "提示",
          content: "送礼物数量不能大于99"
        });
      } else {
        this.changeTotal();
      }
    },
    // input失去焦点事件
    onIpt() {
      let _this = this;
      if (this.num < 1) {
        wx.showModal({
          title: "提示",
          content: "送礼物数量不能小于1",
          success(res) {
            _this.num = 1;
            _this.changeTotal();
          }
        });
      } else if (this.num > 99) {
        wx.showModal({
          title: "提示",
          content: "送礼物数量不能大于99",
          success(res) {
            _this.num = 99;
            _this.changeTotal();
          }
        });
      } else {
        this.changeTotal();
      }
    },
    // 总价总数量
    changeTotal() {
      this.totalPrice = this.giftListObj.price * this.num;
      this.totalCount = this.giftListObj.count * this.num;
    }
  },
  onLoad(options) {
    // let id = options.id;
    let id = 1;
    // 初始化
    this.giftObj = this.list.find(item => item.id == id); // 人物数据对象
    this.handleClick();
  }
};
</script>

<style>
.giftContainer {
  padding: 0rpx 20rpx 130rpx 20rpx;
  width: 100%;
  background-color: rgb(232, 232, 232);
  box-sizing: border-box;
  font-size: 32rpx;
  color: #999;
}
#giftPer {
  background-color: rgb(240, 240, 240);
}
.toGift {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #fff;
  padding-left: 20rpx;
  margin-top: 40rpx;
  box-sizing: border-box;
}
.gift {
  width: 100%;
  background-color: rgb(240, 240, 240);
}
.giftList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 10rpx;
}
.giftList > div {
  padding: 15rpx;
  width: calc(100% / 3);
  height: 250rpx;
  box-sizing: border-box;
}
.giftShow {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: relative;
  padding-top: 10rpx;
  box-sizing: border-box;
}
.giftShow > img {
  width: 120rpx;
  height: 120rpx;
  margin-top: 10rpx;
}
.giftCount {
  position: absolute;
  bottom: 0rpx;
  width: 100%;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  background-color: rgb(179, 231, 87);
  border-bottom: 3px solid rgb(146, 196, 65);
}
.active {
  background-color: rgb(238, 238, 238);
  border-top: 1px solid rgb(179, 231, 87);
  border-right: 1px solid rgb(179, 231, 87);
  border-left: 1px solid rgb(179, 231, 87);
}
.giftPrice {
  margin-top: 40rpx;
}
.giftPrice {
  display: flex;
  justify-content: space-between;
  height: 80rpx;
  align-items: center;
}
.gift-left {
  padding-left: 10rpx;
}
.gift-left > span:nth-child(2) {
  font-size: 36rpx;
  margin-right: 20rpx;
}
.gift-right {
  display: flex;
  padding-right: 10rpx;
}
.gift-right > button {
  margin: 0rpx;
  padding: 0;
  width: 50rpx;
  height: 50rpx;
  line-height: normal;
  color: #999;
  border-radius: 0%;
}
.gift-right > input {
  width: 100rpx;
  height: 50rpx;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding-left: 38rpx;
  box-sizing: border-box;
}
.giftBtn {
  width: calc(100% + 20rpx);
  margin-left: -20rpx;
  position: fixed;
  bottom: 0rpx;
  z-index: 99;
}
.giftBtn > button {
  border-radius: 0%;
}
</style>