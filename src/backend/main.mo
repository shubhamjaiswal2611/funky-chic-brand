import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

import NewsletterTypes "types/newsletter";
import ProductTypes "types/products";
import CartTypes "types/cart";
import WishlistTypes "types/wishlist";
import OrderTypes "types/orders";

import NewsletterApi "mixins/newsletter-api";
import ProductsApi "mixins/products-api";
import CartApi "mixins/cart-api";
import WishlistApi "mixins/wishlist-api";
import OrdersApi "mixins/orders-api";

import ProductsLib "lib/products";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Newsletter
  let subscribers = Map.empty<Text, NewsletterTypes.Subscriber>();
  include NewsletterApi(subscribers);

  // Products — seed placeholder data on first run
  let products = Map.empty<Text, ProductTypes.Product>();
  ProductsLib.seedProducts(products);
  include ProductsApi(accessControlState, products);

  // Cart (per logged-in user)
  let carts = Map.empty<Principal, CartTypes.Cart>();
  include CartApi(accessControlState, carts);

  // Wishlist (per logged-in user)
  let wishlists = Map.empty<Principal, List.List<WishlistTypes.WishlistItem>>();
  include WishlistApi(accessControlState, wishlists);

  // Orders
  let orders = Map.empty<Text, OrderTypes.Order>();
  let orderCounter = { var value : Nat = 0 };
  include OrdersApi(accessControlState, orders, carts, orderCounter);

  // Stripe configuration
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?config) { config };
    };
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
