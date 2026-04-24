import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import WishlistLib "../lib/wishlist";
import WishlistTypes "../types/wishlist";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlists : Map.Map<Principal, List.List<WishlistTypes.WishlistItem>>,
) {
  public query ({ caller }) func getWishlist() : async [WishlistTypes.WishlistItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to view wishlist");
    };
    WishlistLib.getWishlist(wishlists, caller);
  };

  public shared ({ caller }) func addToWishlist(productId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to add to wishlist");
    };
    WishlistLib.addToWishlist(wishlists, caller, productId, Time.now());
  };

  public shared ({ caller }) func removeFromWishlist(productId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Login required to remove from wishlist");
    };
    WishlistLib.removeFromWishlist(wishlists, caller, productId);
  };
};
