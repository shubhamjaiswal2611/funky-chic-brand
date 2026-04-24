import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrdersLib "../lib/orders";
import OrderTypes "../types/orders";
import CartTypes "../types/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Text, OrderTypes.Order>,
  carts : Map.Map<Principal, CartTypes.Cart>,
  orderCounter : { var value : Nat },
) {
  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to view orders");
    };
    OrdersLib.getOrdersByUser(orders, caller);
  };

  public query ({ caller }) func adminGetAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrdersLib.getAllOrders(orders);
  };

  public shared ({ caller }) func adminUpdateOrderStatus(orderId : Text, status : OrderTypes.OrderStatus) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrdersLib.updateStatus(orders, orderId, status);
  };

  public shared ({ caller }) func placeOrder(
    items : [OrderTypes.OrderItem],
    totalInCents : Nat,
    shippingAddress : OrderTypes.ShippingAddress,
    stripeSessionId : ?Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to place an order");
    };
    orderCounter.value += 1;
    let orderId = OrdersLib.generateOrderId(orderCounter.value);
    let order : OrderTypes.Order = {
      id = orderId;
      userId = caller;
      items;
      totalInCents;
      shippingAddress;
      status = #pending;
      stripeSessionId;
      createdAt = Time.now();
    };
    OrdersLib.createOrder(orders, order);
    orderId;
  };
};
