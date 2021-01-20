import "./logs.scss";
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
    const logsArr:number[] = (wx.getStorageSync("logs") as number[] ) || [];
    this.setData({
      logs: logsArr.map((log: number) => {
        const time = Number(log);
        return formatTime(new Date(time));
      }),
    });
  },
});
