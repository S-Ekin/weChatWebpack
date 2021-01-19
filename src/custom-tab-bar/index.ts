Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "上报",
    }, {
      pagePath: "/pages/logs/logs",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "日志",
    }],
  },
  attached() {
    console.log(12);
  },
  methods: {
    switchTab() {
     // const data = e.currentTarget.dataset;
     // const url = data.path;
      // this.setData({
      //   selected: data.index,
      // },function(){
      //   wx.switchTab({url});
      // });
    },
  },
});