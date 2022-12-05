import type { HydratedDocument, Types } from "mongoose";
import { FoodItem } from "server/fooditem/model";
import SlotCollection from "../slot/collection";
import OrderModel, { Order } from "./model";

class OrderCollection {
  /**
   * add an order
   *
   * @return {Promise<HydratedDocument<Order>>} - The order item created
   */
  static async addOne(
    userId: Types.ObjectId | string,
    slotId: Types.ObjectId | string,
    items: Object
  ): Promise<HydratedDocument<Order>> {
    const order = new OrderModel({
      userId,
      slotId,
      items,
    });

    return (await order.save()).populate("userId slotId");
  }

  /**
   * finds an order
   *
   * @return {Promise<HydratedDocument<Order>>} - The order based on userId and slotId
   */
  static async findOneByUserAndSlot(
    userId: Types.ObjectId,
    slotId: Types.ObjectId
  ): Promise<HydratedDocument<Order>[]> {
    const order = await OrderModel.find({ userId, slotId }).populate(
      "userId slotId"
    );
    return order;
  }

  /**
   * finds an order based on orderId
   *
   * @return {Promise<HydratedDocument<Order>>} - The order found
   */
  static async findOne(
    _id: Types.ObjectId
  ): Promise<HydratedDocument<Order>[]> {
    const order = await OrderModel.find({ _id }).populate("userId slotId");
    return order;
  }

  /**
   * finds all orders of a user
   *
   * @return {Promise<HydratedDocument<Order>[]>} - The orders of user
   */
  static async findAllByUser(
    userId: Types.ObjectId
  ): Promise<HydratedDocument<Order>[]> {
    const order = await OrderModel.find({ userId }).populate(
      "userId slotId"
    );
    return order;
  }

  /**
   * finds all orders of a user
   *
   * @return {Promise<HydratedDocument<Order>>} - updated order
   */
  static async upateOneById(
    orderId: Types.ObjectId,
    slotId?: Types.ObjectId,
    items?: [FoodItem]
  ): Promise<HydratedDocument<Order>> {
    const order = (await OrderModel.find({ _id: orderId })) as any;

    if (slotId) {
      order.slotId = slotId;
    }

    if (items) {
      order.items = items;
    }

    return await order.save().populate("userId slotId");
  }

  /**
   * deletes based on the filter
   *
   * @return {Promise<Number>} - deleted count
   */
  static async deleteByFilter(filter: any): Promise<Number> {
    return (await OrderModel.deleteMany(...filter)).deletedCount;
  }
}

export default OrderCollection;
