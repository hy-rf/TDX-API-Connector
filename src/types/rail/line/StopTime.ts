import StationName from "../other/StationName";

export default interface StopTime {
  StopSequence: number;
  StationID: string;
  StationName: StationName;
  ArrivalTime: string;
  DepartureTime: string;
  SuspendedFlag: number;
}
