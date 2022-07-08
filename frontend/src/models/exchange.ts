import Order, { OrderSide, OrderStatus, OrderType } from "./order";
import _ from "lodash";
import Account from "./account";

export default class Exchange {
  asks: Array<Order>; // 卖方
  bids: Array<Order>; // 买方
  instPrice: number;
  accounts: {
    [id: string]: Account;
  } = {};

  constructor() {
    this.instPrice = 0;
    this.asks = [];
    this.bids = [];
  }

  placeOrder(order: Order) {
    if (order.side === OrderSide.long) {
      this.bids.push(order);
    } else {
      this.asks.push(order);
    }
    this.sortOrder();
  }

  sortOrder() {
    this.asks.map((order) => {
      if (order.typ === OrderType.market) {
        order.price = this.instPrice;
      }
    });
    this.bids.map((order) => {
      if (order.typ === OrderType.market) {
        order.price = this.instPrice;
      }
    });
    // price越小，时间越早的放前面
    this.asks = this.asks.sort((a, b): any => {
      if (a.price > b.price) {
        return 1;
      } else if (a.price < b.price) {
        return -1;
      } else if (a.createTime > b.createTime) {
        return -1;
      } else if (a.createTime < b.createTime) {
        return 1;
      } else {
        return 0;
      }
    });
    // price越大，时间越早的放前面
    this.bids = this.bids.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      } else if (a.price < b.price) {
        return 1;
      } else if (a.createTime > b.createTime) {
        return -1;
      } else if (a.createTime < b.createTime) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  make() {
    const ask = this.asks[0];
    const bid = this.bids[0];
    if (ask && bid && ask.price <= bid.price) {
      // 撮合交易
      const price = [this.instPrice, ask.price, bid.price].sort()[1];
      const fillSize = Math.min(
        ask.size - ask.filledSize,
        bid.size - bid.filledSize
      );
    //   ask.fillSize(fillSize, price);
      this.accounts[ask.accountId];
    //   bid.fillSize(fillSize, price);

      if (ask.status === OrderStatus.filled) {
        this.asks.shift();
      }
      if (bid.status === OrderStatus.filled) {
        this.bids.shift();
      }

      // 更新价格
      this.instPrice = (ask.price + bid.price) / 2;
      this.sortOrder();
      this.make();
    }
  }
}
