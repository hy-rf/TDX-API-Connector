import { Request, Response } from "express";
import { URLSearchParams } from "url";
import dotenv from "dotenv";
import path from "path";
import getAccessToken from "../services/getAccessToken";
import TRAStationInfo from "../types/rail/station/TRAStationInfo";
import token from "../types/rail/other/token";
import TimeBoard from "../types/rail/station/TimeBoard";
import LineInfo from "../types/rail/line/LineInfo";
import DelayData from "../types/rail/line/DelayData";
import DailyStationsLines from "../types/rail/station/DailyStationsLines";
import database from "../services/database";
dotenv.config({
  path: path.resolve(__dirname, "../../.env.local"),
});
export default class RailController {
  async getAccessToken(req: Request, res: Response) {
    const param = new URLSearchParams();
    param.append("grant_type", "client_credentials");
    param.append("client_id", process.env.TDX_CLIENT_ID || "");
    param.append("client_secret", process.env.TDX_CLIENT_SECRET || "");

    const fetchTokenRes = await fetch(
      "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Encoding": "br,gzip",
        },
        body: param,
      }
    );
    if (fetchTokenRes.status != 200) {
      res.send({
        code: 400,
        message: "Token Not Found",
      });
      return;
    }
    let token = await fetchTokenRes.json();
    const db = database();
    const utc8TimeNow: string = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
      hourCycle: "h23",
    });
    const utc8TimeNowAray: string[] = utc8TimeNow.split(",")[0].split("/");
    const utc8TimeNowToStore = `${utc8TimeNowAray[2]}-${utc8TimeNowAray[0]}-${utc8TimeNowAray[1]}`;
    db.collection("setting").doc(utc8TimeNowToStore).set(token);
    res.send({
      code: 200,
      message: "Success",
    });
  }
  async getRailStations(req: Request, res: Response) {
    // get today's access token
    const token = (await getAccessToken()) as token;
    var data = await fetch(
      "https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/Station?%24format=JSON",
      {
        headers: {
          authorization: token.token_type + " " + token?.access_token,
          "Accept-Encoding": "br,gzip",
        },
      }
    );
    const rails = (await data.json()) as Array<TRAStationInfo>;
    if (rails.length === undefined) {
      return;
    }
    res.send(rails);
  }
  async getTimeBoard(req: Request, res: Response) {
    const token = (await getAccessToken()) as token;
    const data = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/LiveBoard/Station/${req.params.sid}?%24format=JSON`,
      {
        headers: {
          authorization: token.token_type + " " + token?.access_token,
          "Accept-Encoding": "br,gzip",
        },
      }
    );
    const timeboard = (await data.json()) as Array<TimeBoard>;
    res.send(timeboard);
  }
  async getTodayLineStops(req: Request, res: Response) {
    const token = (await getAccessToken()) as token;
    const data = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/DailyTimetable/Today/TrainNo/${req.params.tn}?%24format=JSON`,
      {
        headers: {
          authorization: token.token_type + " " + token?.access_token,
          "Accept-Encoding": "br,gzip",
        },
      }
    );
    const rawDelayData = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/LiveTrainDelay?%24filter=TrainNo%20eq%20%27${req.params.tn}%27&%24format=JSON`,
      {
        headers: {
          authorization: token.token_type + " " + token?.access_token,
          "Accept-Encoding": "br,gzip",
        },
      }
    );
    const linestops = (await data.json()) as Array<LineInfo>;
    if (linestops.length == undefined) {
      return;
    }
    const delayData = (await rawDelayData.json()) as Array<DelayData>;
    (() => {
      if (delayData.length == undefined) {
        linestops[0].DelayTime = -1;
        return;
      }
      if (delayData.length == 0) {
        linestops[0].DelayTime = 0;
        return;
      }
      linestops[0].DelayTime = delayData[0].DelayTime;
      return;
    })();
    res.send(linestops);
  }
  async getStops(req: Request, res: Response) {
    const token = (await getAccessToken()) as token;
    const data = await fetch(
      `https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/DailyTimetable/Station/${req.params.stationId}/${req.params.trainDate}?%24format=JSON`,
      {
        headers: {
          authorization: token.token_type + " " + token?.access_token,
          "Accept-Encoding": "br,gzip",
        },
      }
    );
    const stops = (await data.json()) as Array<DailyStationsLines>;
    res.send(stops);
  }
}