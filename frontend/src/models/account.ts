import Order, { OrderSide, OrderStatus } from "./order";

interface IPostion {
  side: OrderSide;
  avgPrice: number;
}

/**
 * 账户模型
 */
export default class Account {
  id: string;
  margin: number = 0;
  orders: Array<Order> = [];
  positionSize: number = 0; // 仓位

  constructor(id: string) {
    this.id = id;
  }

  fillOrder(order: Order, size: number, price: number) {
    // 订单状态
    const leftSize = order.size - order.filledSize;
    if (size > leftSize) {
      throw new Error("订单不足");
    }
    order.filledSize += size;
    order.fillHistory.push({
      size,
      price,
      time: Date.now(),
    });
    if (order.size === order.filledSize) {
      order.status === OrderStatus.filled;
    }

    // 仓位计算
    if (order.side === OrderSide.long) {
      this.positionSize += size;
    } else {
      this.positionSize -= size;
    }

    // 
  }

  createLimitOrder() {}

  createMarketOrder() {}
}
