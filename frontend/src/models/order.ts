import uuid from "uuid";

export enum OrderType {
  limit,
  market,
}

export enum OrderStatus {
  live,
  filled,
  partiallyFilled,
  canceled,
}

export enum OrderSide {
  long,
  short,
}

/**
 * 订单模型
 */
export default class Order {
  id: string;
  createTime: number;
  typ: OrderType;
  price: number;
  size: number; // 张数
  filledSize: number = 0; // 成交的张数
  accountId: string;
  status: OrderStatus;
  side: OrderSide;
  fillHistory: Array<{ size: number; price: number; time: number }> = [];

  constructor(options: {
    typ: OrderType;
    price: number;
    accountId: string;
    side: OrderSide;
    size: number;
  }) {
    this.id = uuid.v4();
    this.createTime = Date.now();
    this.typ = options.typ;
    this.price = options.price;
    this.accountId = options.accountId;
    this.status = OrderStatus.live;
    this.side = options.side;
    this.size = options.size;
  }
}
