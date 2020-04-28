import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "https://mp.zymcloud.com/hp-hd" // 基础路径
fly.config.baseURL = host;
export default fly;