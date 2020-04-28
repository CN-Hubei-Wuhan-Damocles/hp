<template>
  <div class="luckWrap">
    <div class="luck-title">(您有{{ count }}次抽奖的机会)</div>
    <div class="luck-msg">
      <span v-show="isPrize">恭喜您获得{{ prizeName }}</span>
    </div>
    <div class="luck-box">
      <div class="luck-list" v-for="item in prize" :key="key" @click="handleClick(item.id)">
        <div class="luck-img" :style="{'background-color':item.bg}">
          <img :src="item.img" mode="widthFix" />
          <div class="luck-mask" :class="{'active':item.bgCount==activeCount}"></div>
        </div>
      </div>
    </div>
    <div class="luck-logo">
      <img src="../../../static/luck/bottom-banner.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "luck",
  data() {
    return {
      // 抽奖次数
      count: 1,
      //奖品信息
      prize: [
        {
          id: 1,
          name: "电脑",
          img: "../../static/luck/luck1.png",
          bg: "#FFF5A5",
          bgCount: 2
        },
        {
          id: 2,
          name: "蓝牙音箱",
          img: "../../static/luck/luck2.png",
          bg: "#A5FEE0",
          bgCount: 3
        },
        {
          id: 3,
          name: "背包",
          img: "../../static/luck/luck3.png",
          bg: "#A3D9FD",
          bgCount: 4
        },
        {
          id: 4,
          name: "鼠标垫",
          img: "../../static/luck/luck4.png",
          bg: "#FFB9C1",
          bgCount: 1
        },
        {
          id: 5,
          name: "抽奖",
          img: "../../static/luck/luck5.png",
          bg: "#FFFFFF",
          bgCount: undefined
        },
        {
          id: 6,
          name: "笔记本",
          img: "../../static/luck/luck6.png",
          bg: "#FFB9C1",
          bgCount: 5
        },
        {
          id: 7,
          name: "台灯",
          img: "../../static/luck/luck7.png",
          bg: "#A3D9FD",
          bgCount: 8
        },
        {
          id: 8,
          name: "牙刷",
          img: "../../static/luck/luck8.png",
          bg: "#A5FEE0",
          bgCount: 7
        },
        {
          id: 9,
          name: "行李箱",
          img: "../../static/luck/luck9.png",
          bg: "#FFF5A5",
          bgCount: 6
        }
      ],
      //奖品信息显示
      isPrize: false,
      prizeName: "",
      activeCount: 0,
      // 设锁
      flag: false
    };
  },
  methods: {
    handleClick(id) {
      // 设置点击锁,一次抽奖只能点击一次,要等抽奖完成才能执行下一次
      if (this.flag) return;
      this.flag = true; // 上锁
      // 抽奖有次数才能抽
      if (this.count > 0) {
        //点击抽奖时才能触发
        if (id == 5) {
          this.count--;
          let t = Math.floor(Math.random() * 20) + 16; // 转圈至少两轮
          this.luck(t, res => {
            this.flag = false; // 开锁
            this.isPrize = true;
            this.prizeName = this.prize.find(item => item.bgCount == res).name;
          });
        }
      } else {
        this.flag = false; // 开锁
        wx.showToast({
          title: "您已抽过奖",
          icon: "none",
          duration: 2000
        });
      }
    },
    luck(t, callback) {
      let timer = setInterval(() => {
        this.activeCount++;
        if (this.activeCount > 8) {
          this.activeCount = 1;
        }
      }, 500);
      setTimeout(() => {
        clearInterval(timer);
        if (callback) {
          callback(this.activeCount);
        }
      }, t * 500);
    }
  }
};
</script>

<style scoped>
.luckWrap {
  background-color: rgb(97, 197, 195);
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1;
  text-align: center;
  box-sizing: border-box;
  padding: 0rpx 40rpx;
}
.luck-logo {
  position: fixed;
  z-index: 2;
  bottom: 0rpx;
  width: 100%;
  margin-left: -40rpx;
}
.luck-logo > img {
  vertical-align: middle;
  width: 100%;
  height: 300rpx;
}
.luck-title {
  color: red;
  font-size: 24rpx;
  margin-top: 60rpx;
}
.luck-msg {
  color: white;
  font-size: 32rpx;
  height: 100rpx;
  line-height: 100rpx;
}
.luck-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border: 4px solid rgb(255, 218, 1);
  border-radius: 15rpx;
  box-sizing: border-box;
}
.luck-list {
  width: calc(100% / 3);
  height: auto;
  background-color: rgb(97, 197, 195);
  padding: 15rpx;
  box-sizing: border-box;
}
.luck-img {
  border: 1px solid red;
  box-sizing: border-box;
  border-radius: 20rpx;
  padding: 20rpx;
  position: relative;
}
.luck-img > img {
  vertical-align: middle;
  width: 100%;
}
.luck-mask {
  position: absolute;
  top: 0rpx;
  left: 0rpx;
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
  opacity: 0.6;
}
.active {
  background-color: red;
}
</style>