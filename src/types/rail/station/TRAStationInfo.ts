import StationName from "../other/StationName";
import StationPosition from "../other/StationPosition";

export default interface TRAStationInfo {
  StationUID: string;
  StationID: string;
  StationName: StationName;
  StationAddress: string;
  StationPhone: string;
  OperatorID: string;
  StationClass: string;
  UpdateTime: string;
  VersionID: number;
  StationPosition: StationPosition;
  LocationCity: string;
  LocationCityCode: string;
  LocationTown: string;
  LocationTownCode: string;
}
