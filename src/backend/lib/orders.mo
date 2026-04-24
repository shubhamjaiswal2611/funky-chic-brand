import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Types "../types/orders";

module {
  public func createOrder(
    orders : Map.Map<Text, Types.Order>,
    order : Types.Order,
  ) : () {
    orders.add(order.id, order);
  };

  public func getOrder(orders : Map.Map<Text, Types.Order>, orderId : Text) : ?Types.Order {
    orders.get(orderId);
  };

  public func getOrdersByUser(
    orders : Map.Map<Text, Types.Order>,
    userId : Principal,
  ) : [Types.Order] {
    orders.values().filter(func(o : Types.Order) : Bool { o.userId == userId }).toArray();
  };

  public func getAllOrders(orders : Map.Map<Text, Types.Order>) : [Types.Order] {
    orders.values().toArray();
  };

  public func updateStatus(
    orders : Map.Map<Text, Types.Order>,
    orderId : Text,
    status : Types.OrderStatus,
  ) : Bool {
    switch (orders.get(orderId)) {
      case (null) { false };
      case (?o) {
        orders.add(orderId, { o with status });
        true;
      };
    };
  };

  public func generateOrderId(counter : Nat) : Text {
    "ORD-" # counter.toText();
  };
};
