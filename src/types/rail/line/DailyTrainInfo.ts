import StationName from "../other/StationName";
import TrainTypeName from "../other/TrainTypeName";

export default interface DailyTrainInfo {
  TrainNo: string;
  Direction: number;
  StartingStationID: string;
  StartingStationName: StationName;
  EndingStationID: string;
  EndingStationName: StationName;
  TrainTypeID: string;
  TrainTypeCode: string;
  TrainTypeName: TrainTypeName;
  TripLine: number;
  WheelchairFlag: number;
  PackageServiceFlag: number;
  DiningFlag: number;
  BikeFlag: number;
  BreastFeedingFlag: number;
  DailyFlag: number;
  ServiceAddedFlag: number;
  SuspendedFlag: number;
  Note: any;
}
