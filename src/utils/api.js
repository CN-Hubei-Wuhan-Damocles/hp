// 获取openId接口
let openId = "/applet/activity/getAppid"
// tabbar页面接口
let index = "/applet/activity/list"
// 热门活动接口
let active = "/applet/activity/getActivityList"
// 搜索选手接口
let search = "/applet/activity/activityPlayer"
// 所有选手接口
let allList = "/applet/activity/activityPlayer"
// 排行榜数据接口
let rank = "/applet/activity/playerRank"
// 选手详情
let perDetail = "/applet/activity/player"
// 选手的投票记录接口
let voteData = "/applet/activity/playerTicket"
// 我要报名接口
let sign = "/applet/activity/add"
// 报名判断接口
let isLogin = "/applet/activity/groupList"
// 问卷调查接口
let asked = "/applet/activity/addHdInfogiftlog"
// 给选手投票接口
let addTicket = "/applet/activity/vote"
// 礼物接口
let giftList = "/applet/activity/giftList"
// 支付接口
let payWeixin = "/applet/pay/wxMiniProgramPay"
// 支付成功后回传用户信息
let backUserMsg = "/applet/activity/giftVote"
//  确认订单是否回调成功
let orderConfirm = "/applet/pay/orderConfirm"
export default {
    openId,
    index,
    active,
    search,
    allList,
    rank,
    perDetail,
    voteData,
    sign,
    isLogin,
    asked,
    addTicket,
    giftList,
    payWeixin,
    backUserMsg,
    orderConfirm
}