module {
  public type OrderStatus = {
    #pending;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type ShippingAddress = {
    name : Text;
    line1 : Text;
    line2 : ?Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type OrderItem = {
    productId : Text;
    productName : Text;
    quantity : Nat;
    priceInCents : Nat;
    variantSize : ?Text;
    variantColor : ?Text;
  };

  public type Order = {
    id : Text;
    userId : Principal;
    items : [OrderItem];
    totalInCents : Nat;
    shippingAddress : ShippingAddress;
    status : OrderStatus;
    stripeSessionId : ?Text;
    createdAt : Int;
  };
};
