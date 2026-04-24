import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Types "../types/wishlist";

module {
  public func getWishlist(
    wishlists : Map.Map<Principal, List.List<Types.WishlistItem>>,
    userId : Principal,
  ) : [Types.WishlistItem] {
    switch (wishlists.get(userId)) {
      case (?list) { list.toArray() };
      case (null) { [] };
    };
  };

  public func addToWishlist(
    wishlists : Map.Map<Principal, List.List<Types.WishlistItem>>,
    userId : Principal,
    productId : Text,
    now : Int,
  ) : () {
    let list = switch (wishlists.get(userId)) {
      case (?l) { l };
      case (null) { List.empty<Types.WishlistItem>() };
    };
    // Only add if not already present
    let alreadyAdded = list.find(func(i : Types.WishlistItem) : Bool { i.productId == productId });
    switch (alreadyAdded) {
      case (?_) {}; // already in wishlist, skip
      case (null) {
        list.add({ productId; addedAt = now });
        wishlists.add(userId, list);
      };
    };
  };

  public func removeFromWishlist(
    wishlists : Map.Map<Principal, List.List<Types.WishlistItem>>,
    userId : Principal,
    productId : Text,
  ) : () {
    switch (wishlists.get(userId)) {
      case (null) {};
      case (?list) {
        let newList = list.filter(func(i : Types.WishlistItem) : Bool { i.productId != productId });
        wishlists.add(userId, newList);
      };
    };
  };
};
