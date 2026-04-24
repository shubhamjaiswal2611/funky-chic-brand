module {
  public type ProductVariant = {
    size : ?Text;
    color : ?Text;
  };

  public type Product = {
    id : Text;
    name : Text;
    price : Nat;
    description : Text;
    category : Text;
    imageUrl : Text;
    variants : [ProductVariant];
    stockQuantity : Nat;
  };
};
