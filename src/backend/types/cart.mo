module {
  public type CartItem = {
    productId : Text;
    quantity : Nat;
    variantSize : ?Text;
    variantColor : ?Text;
  };

  public type Cart = {
    userId : Principal;
    items : [CartItem];
    updatedAt : Int;
  };
};
