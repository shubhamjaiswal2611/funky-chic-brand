import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/cart";

module {
  public func getCart(carts : Map.Map<Principal, Types.Cart>, userId : Principal) : Types.Cart {
    switch (carts.get(userId)) {
      case (?cart) { cart };
      case (null) {
        { userId; items = []; updatedAt = Time.now() };
      };
    };
  };

  public func addItem(
    carts : Map.Map<Principal, Types.Cart>,
    userId : Principal,
    item : Types.CartItem,
    now : Int,
  ) : () {
    let current = getCart(carts, userId);
    // Check if item with same productId+variant already exists
    let existing = current.items.find(
      func(i : Types.CartItem) : Bool {
        i.productId == item.productId and
        i.variantSize == item.variantSize and
        i.variantColor == item.variantColor;
      }
    );
    let newItems = switch (existing) {
      case (?_) {
        // Update quantity
        current.items.map(
          func(i) {
            if (
              i.productId == item.productId and
              i.variantSize == item.variantSize and
              i.variantColor == item.variantColor
            ) {
              { i with quantity = i.quantity + item.quantity }
            } else {
              i
            };
          }
        );
      };
      case (null) {
        // Append new item
        current.items.concat([item]);
      };
    };
    carts.add(userId, { userId; items = newItems; updatedAt = now });
  };

  public func removeItem(
    carts : Map.Map<Principal, Types.Cart>,
    userId : Principal,
    productId : Text,
    now : Int,
  ) : () {
    let current = getCart(carts, userId);
    let newItems = current.items.filter(
      func(i : Types.CartItem) : Bool { i.productId != productId }
    );
    carts.add(userId, { userId; items = newItems; updatedAt = now });
  };

  public func updateQuantity(
    carts : Map.Map<Principal, Types.Cart>,
    userId : Principal,
    productId : Text,
    quantity : Nat,
    now : Int,
  ) : () {
    let current = getCart(carts, userId);
    let newItems = if (quantity == 0) {
      current.items.filter(func(i : Types.CartItem) : Bool { i.productId != productId });
    } else {
      current.items.map(
        func(i) {
          if (i.productId == productId) { { i with quantity } } else { i };
        }
      );
    };
    carts.add(userId, { userId; items = newItems; updatedAt = now });
  };

  public func clearCart(carts : Map.Map<Principal, Types.Cart>, userId : Principal, now : Int) : () {
    carts.add(userId, { userId; items = []; updatedAt = now });
  };
};
