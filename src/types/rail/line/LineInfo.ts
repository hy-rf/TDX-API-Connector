import DailyTrainInfo from "./DailyTrainInfo";
import StopTime from "./StopTime";

export default interface LineInfo {
  TrainDate: string;
  DailyTrainInfo: DailyTrainInfo;
  StopTimes: Array<StopTime>;
  DelayTime: number;
}
