import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartLib "../lib/cart";
import CartTypes "../types/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Principal, CartTypes.Cart>,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to view cart");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(item : CartTypes.CartItem) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to add to cart");
    };
    CartLib.addItem(carts, caller, item, Time.now());
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to modify cart");
    };
    CartLib.removeItem(carts, caller, productId, Time.now());
  };

  public shared ({ caller }) func updateCartQuantity(productId : Text, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to modify cart");
    };
    CartLib.updateQuantity(carts, caller, productId, quantity, Time.now());
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to clear cart");
    };
    CartLib.clearCart(carts, caller, Time.now());
  };
};
