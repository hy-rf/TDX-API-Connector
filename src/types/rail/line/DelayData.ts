import StationName from "../other/StationName";

export default interface DelayData {
  TrainNo: string;
  StationID: string;
  StationName: StationName;
  DelayTime: number;
  SrcUpdateTime: string;
  UpdateTime: string;
}
