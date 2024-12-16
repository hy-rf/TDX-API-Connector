import StationName from "../other/StationName";
import TrainTypeName from "../other/TrainTypeName";

export default interface DailyStationsLines {
  TrainDate: string;
  StationID: string;
  StationName: StationName;
  TrainNo: string;
  Direction: number;
  TripLine: number;
  TrainTypeID: string;
  TrainTypeCode: string;
  TrainTypeName: TrainTypeName;
  StartingStationID: string;
  StartingStationName: StationName;
  EndingStationID: string;
  EndingStationName: StationName;
  ArrivalTime: string;
  DepartureTime: string;
  SuspendedFlag: number;
  UpdateTime: string;
  VersionID: number;
}
