App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = (wx.getStorageSync('logs') as number[]) || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    // 登录
    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url:"http://172.16.13.139:8080/AdvEventS/login/logVal",
          data:{
            "user_name":"质控科",
            "password":"F59BD65F7EDAFB087A81D4DCA06C4910",
          },
          method:"POST",
          header:{
            "content-type":"application/json",
          },
          success: function(data){
             data.header["Set-Cookie"] != undefined && wx.setStorageSync("cookie",data.header["Set-Cookie"]);
            console.log(data);
          },
        });
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: user => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = user.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(user);
              }
            },
          });
        }
      },
    });
  },
});