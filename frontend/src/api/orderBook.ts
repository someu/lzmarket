import axios from "axios";
import config from "../config";

export function getOrderBooks(body: {
  page: number;
  size: number;
  instId: string;
  action: string;
  tsGte: number;
  tsLte: number;
}) {
  return axios.post("/orderbook/list", {
    apiSec: config.apiSec,
    ...body,
  });
}
