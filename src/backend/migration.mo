import Map "mo:core/Map";
import ProductTypes "types/products";

module {
  // OldProduct matches the actual stored state — emotion and series are already present
  type OldProductVariant = {
    size : ?Text;
    color : ?Text;
  };

  type OldProduct = {
    id : Text;
    name : Text;
    price : Nat;
    description : Text;
    category : Text;
    imageUrl : Text;
    variants : [OldProductVariant];
    stockQuantity : Nat;
    emotion : Text;
    series : Text;
  };

  type OldActor = {
    products : Map.Map<Text, OldProduct>;
  };

  type NewActor = {
    products : Map.Map<Text, ProductTypes.Product>;
  };

  public func run(old : OldActor) : NewActor {
    // Products already have emotion and series — pass through unchanged
    let products = old.products.map<Text, OldProduct, ProductTypes.Product>(
      func(_id, p) { p }
    );
    { products };
  };
};
