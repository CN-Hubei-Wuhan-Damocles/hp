<template>
  <div class="giftContainer">
    <Per :detailObj="giftObj"></Per>
    <!-- 送礼 -->
    <div class="toGift">送礼物加票数</div>
    <!-- 礼物部分 -->
    <div class="gift">
      <div class="giftList">
        <div v-for="item in giftList" :key="key" @click="handleClick(item.id)">
          <div class="giftShow" :class="{ active: item.id==current }">
            <span>{{ item.name }}</span>
            <img :src="item.icon" />
            <!-- <img src="../../../static/images/gift1.png" /> -->
            <div class="giftCount">+{{ item.ticket }}票</div>
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
      <button type="primary" @click="payMoney">立即送出</button>
    </div>
  </div>
</template>

<script>
import Per from "../../components/per";
import Store from "../../utils/store";
export default {
  name: "gift",
  components: {
    Per
  },
  data() {
    return {
      // 分组数据
      giftObj: {},
      // 礼物数据
      giftList: [],
      current: 0,
      giftListObj: null,
      // 礼物数量
      num: 0,
      id: 0, // 礼物id
      totalPrice: null,
      totalCount: null,
      // 选手id
      playId: 0
    };
  },
  computed: {},
  methods: {
    handleClick(id) {
      this.current = id;
      this.giftListObj = this.giftList.find(item => item.id == this.current);
      this.num = 1;
      this.id = id;
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
      this.totalCount = this.giftListObj.ticket * this.num;
      // 总价小数点的bug
      if (this.giftListObj.price < 1) {
        this.totalPrice = this.totalPrice.toFixed(2);
      }
    },
    // 礼物接口
    getList() {
      this.$fly
        .post(this.$api.giftList, {
          activityId: 1,
          id: this.playId
        })
        .then(res => {
          this.giftObj = res.data.data.player;
          this.giftList = res.data.data.hdGift;
          // 默认礼物为第一个
          this.handleClick(res.data.data.hdGift[0].id);
        });
    },
    // 立即送出
    payMoney() {
      let _this = this;
      let price = _this.totalPrice * 100; // 微信以分计算，当前金额需要*100;
      wx.login({
        success(res) {
          if (res.code) {
            //支付接口请求
            _this.$fly
              .post(_this.$api.payWeixin, {
                total_fee: price,
                js_code: res.code
              })
              .then(res => {
                if (res.data.code == 0) {
                  wx.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success(result) {
                      // 支付成功
                      let value = Store.getItem("openid"); // openid
                      let nickName = Store.getItem("userMsg").nickName; // 用户名
                      let avatarUrl = Store.getItem("userMsg").avatarUrl; // 用户信息
                      // 回传用户信息
                      _this.$fly
                        .post(_this.$api.backUserMsg, {
                          extend1: value,
                          extend2: nickName,
                          extend3: avatarUrl,
                          playerId: _this.playId,
                          giftId: _this.id,
                          quantity: JSON.stringify(_this.num),
                          amount: price,
                          ticket: _this.totalCount,
                          activityId: 1
                        })
                        .then(res => {
                          // console.log(res);
                        })
                        .catch(err => {
                          // console.log(err);
                        });
                      // 确认订单是否回调成功
                      _this.$fly
                        .post(_this.$api.orderConfirm, {
                          orderId: res.data.data.orderId
                        })
                        .then(res => {
                          // console.log(res);
                          if (res.data.code == 0) {
                            _this.getList();
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    },
                    fail(err) {
                      console.log(err);
                    }
                  });
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: "none",
                    duration: 2000
                  });
                }
              });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  },
  onLoad(options) {
    let id = options.id;
    id = 1;
    this.playId = id;
    this.getList();
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