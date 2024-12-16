import { Router } from "express";
import RailController from "../controllers/railController";
export default class BaseRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  initRoutes() {
    const railController = new RailController();
    this.router.get("/rail/token", railController.getAccessToken);
    this.router.get("/rail/station", railController.getRailStations);
    this.router.get(
      "/rail/station/:stationId/line/:trainDate",
      railController.getStops
    );
    this.router.get("/rail/timeboard/:sid", railController.getTimeBoard);
    this.router.get("/rail/line/:tn", railController.getTodayLineStops);
  }
}
