// 使用storage缓存信息
export default {
    // 存值
    setItem(key, value, _name) {
        if (_name) {
            let _name_info = this.getItem(_name);
            _name_info[key] = value;
            wx.setStorageSync(_name, _name_info);
        } else {
            wx.setStorageSync(key, value);
        }
    },
    // 取值
    getItem(key, _name) {
        if (_name) {
            let val = this.getItem(_name);
            if (val) return val[key];
            return "";
        } else {
            return wx.getStorageSync(key);
        }
    },
    // 删除值
    clearItem(key) {
        if (key) {
            wx.removeStorageSync(key);
        } else {
            wx.clearStorageSync();
        }
    }
}