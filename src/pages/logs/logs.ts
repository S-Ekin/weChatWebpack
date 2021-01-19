import { formatTime } from "../../utils/util";
type data = {
  logs: string[]
};
Page<data,{
  data:data
}>({
  data: {
    logs: [],
  },
  onLoad() {
    const logsArr:string[] = (wx.getStorageSync("logs") as data["logs"] ) || [];
    this.setData({
      logs: logsArr.map((log: string) => {
        return formatTime(new Date(log));
      }),
    });
  },
});
