import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductsLib "../lib/products";
import Types "../types/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Text, Types.Product>,
) {
  public query func getProducts() : async [Types.Product] {
    ProductsLib.getAll(products);
  };

  public query func getProduct(id : Text) : async ?Types.Product {
    ProductsLib.getById(products, id);
  };

  public shared ({ caller }) func adminAddProduct(product : Types.Product) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    ProductsLib.add(products, product);
  };

  public shared ({ caller }) func adminUpdateProduct(product : Types.Product) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductsLib.update(products, product);
  };

  public shared ({ caller }) func adminDeleteProduct(id : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductsLib.remove(products, id);
  };

  public shared ({ caller }) func adminUpdateStock(id : Text, quantity : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update stock");
    };
    ProductsLib.updateStock(products, id, quantity);
  };

  public query ({ caller }) func adminGetLowStockProducts() : async [Types.Product] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view low stock");
    };
    ProductsLib.getLowStock(products);
  };
};
