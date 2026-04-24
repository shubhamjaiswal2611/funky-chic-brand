import Map "mo:core/Map";
import Types "../types/products";

module {
  public func getAll(products : Map.Map<Text, Types.Product>) : [Types.Product] {
    products.values().toArray();
  };

  public func getById(products : Map.Map<Text, Types.Product>, id : Text) : ?Types.Product {
    products.get(id);
  };

  public func add(products : Map.Map<Text, Types.Product>, product : Types.Product) : () {
    products.add(product.id, product);
  };

  public func update(products : Map.Map<Text, Types.Product>, product : Types.Product) : Bool {
    switch (products.get(product.id)) {
      case (null) { false };
      case (?_) {
        products.add(product.id, product);
        true;
      };
    };
  };

  public func remove(products : Map.Map<Text, Types.Product>, id : Text) : Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func updateStock(products : Map.Map<Text, Types.Product>, id : Text, newQuantity : Nat) : Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?p) {
        products.add(id, { p with stockQuantity = newQuantity });
        true;
      };
    };
  };

  public func isLowStock(product : Types.Product) : Bool {
    product.stockQuantity <= 5;
  };

  public func getLowStock(products : Map.Map<Text, Types.Product>) : [Types.Product] {
    products.values().filter(func(p) { isLowStock(p) }).toArray();
  };

  // Seed 12 placeholder products matching the Lookbook
  public func seedProducts(products : Map.Map<Text, Types.Product>) : () {
    let placeholders : [Types.Product] = [
      {
        id = "p1";
        name = "Tokyo Drift Hoodie";
        price = 8999;
        description = "Street-ready hoodie fusing Japanese kanji prints with graffiti-style brushwork. Oversized fit, heavyweight fleece.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600";
        variants = [
          { size = ?"S"; color = ?"Neon Black" },
          { size = ?"M"; color = ?"Neon Black" },
          { size = ?"L"; color = ?"Neon Black" },
          { size = ?"XL"; color = ?"Neon Black" },
        ];
        stockQuantity = 42;
      },
      {
        id = "p2";
        name = "Mumbai Block Print Kurta";
        price = 7499;
        description = "Traditional hand-block printed kurta reimagined with bold Mughal paisley motifs and electric indigo hues.";
        category = "kurtas";
        imageUrl = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600";
        variants = [
          { size = ?"S"; color = ?"Indigo" },
          { size = ?"M"; color = ?"Indigo" },
          { size = ?"L"; color = ?"Saffron" },
          { size = ?"XL"; color = ?"Saffron" },
        ];
        stockQuantity = 28;
      },
      {
        id = "p3";
        name = "Oaxacan Fiesta Jacket";
        price = 12999;
        description = "Embroidered bomber jacket celebrating Mexican folk art — vibrant marigold and crimson florals on jet black.";
        category = "jackets";
        imageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600";
        variants = [
          { size = ?"S"; color = ?"Black/Marigold" },
          { size = ?"M"; color = ?"Black/Marigold" },
          { size = ?"L"; color = ?"Black/Crimson" },
          { size = ?"XL"; color = ?"Black/Crimson" },
        ];
        stockQuantity = 15;
      },
      {
        id = "p4";
        name = "Lagos Kente Joggers";
        price = 6999;
        description = "Kente-inspired woven joggers with West African geometric patterns. Comfortable stretch fit, tapered leg.";
        category = "bottoms";
        imageUrl = "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600";
        variants = [
          { size = ?"S"; color = ?"Gold/Green" },
          { size = ?"M"; color = ?"Gold/Green" },
          { size = ?"L"; color = ?"Gold/Blue" },
          { size = ?"XL"; color = ?"Gold/Blue" },
        ];
        stockQuantity = 3;
      },
      {
        id = "p5";
        name = "Route 66 Denim Shirt";
        price = 5999;
        description = "Vintage Americana denim shirt with embroidered patches — highway maps, eagles, and retro badges.";
        category = "shirts";
        imageUrl = "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600";
        variants = [
          { size = ?"S"; color = ?"Faded Blue" },
          { size = ?"M"; color = ?"Faded Blue" },
          { size = ?"L"; color = ?"Dark Wash" },
          { size = ?"XL"; color = ?"Dark Wash" },
        ];
        stockQuantity = 20;
      },
      {
        id = "p6";
        name = "Mandala Crop Tee";
        price = 3499;
        description = "Cropped tee with hand-drawn mandala print in neon lime on jet black. Unisex street fit.";
        category = "tees";
        imageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600";
        variants = [
          { size = ?"XS"; color = ?"Black/Lime" },
          { size = ?"S"; color = ?"Black/Lime" },
          { size = ?"M"; color = ?"Black/Pink" },
          { size = ?"L"; color = ?"Black/Pink" },
        ];
        stockQuantity = 55;
      },
      {
        id = "p7";
        name = "Rajasthan Mirror Vest";
        price = 9499;
        description = "Embellished mirror-work vest inspired by Rajasthani folk craft. Statement piece, fully lined.";
        category = "vests";
        imageUrl = "https://images.unsplash.com/photo-1594938298603-c8148c4b4169?w=600";
        variants = [
          { size = ?"S"; color = ?"Crimson/Gold" },
          { size = ?"M"; color = ?"Crimson/Gold" },
          { size = ?"L"; color = ?"Indigo/Silver" },
        ];
        stockQuantity = 8;
      },
      {
        id = "p8";
        name = "Harajuku Patchwork Pants";
        price = 8299;
        description = "Wide-leg patchwork trousers merging Japanese harajuku style with global textile scraps. Each pair unique.";
        category = "bottoms";
        imageUrl = "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600";
        variants = [
          { size = ?"S"; color = ?"Multicolor" },
          { size = ?"M"; color = ?"Multicolor" },
          { size = ?"L"; color = ?"Multicolor" },
        ];
        stockQuantity = 12;
      },
      {
        id = "p9";
        name = "Aztec Graffiti Windbreaker";
        price = 11499;
        description = "Lightweight windbreaker with spray-paint Aztec calendar print. Water-resistant shell, street-art energy.";
        category = "jackets";
        imageUrl = "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600";
        variants = [
          { size = ?"S"; color = ?"Electric Blue" },
          { size = ?"M"; color = ?"Electric Blue" },
          { size = ?"L"; color = ?"Hot Pink" },
          { size = ?"XL"; color = ?"Hot Pink" },
        ];
        stockQuantity = 4;
      },
      {
        id = "p10";
        name = "Sashiko Stitch Sweatshirt";
        price = 7999;
        description = "Premium sweatshirt with traditional Japanese sashiko stitching pattern in contrasting white on navy.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600";
        variants = [
          { size = ?"S"; color = ?"Navy" },
          { size = ?"M"; color = ?"Navy" },
          { size = ?"L"; color = ?"Navy" },
          { size = ?"XL"; color = ?"Navy" },
        ];
        stockQuantity = 30;
      },
      {
        id = "p11";
        name = "Tribal Batik Dress";
        price = 10499;
        description = "Flowing midi dress featuring Indonesian batik patterns with African tribal geometry. Resort-to-street versatility.";
        category = "dresses";
        imageUrl = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600";
        variants = [
          { size = ?"XS"; color = ?"Terracotta" },
          { size = ?"S"; color = ?"Terracotta" },
          { size = ?"M"; color = ?"Indigo" },
          { size = ?"L"; color = ?"Indigo" },
        ];
        stockQuantity = 18;
      },
      {
        id = "p12";
        name = "Neon Bandhani Scarf";
        price = 2499;
        description = "Hand-tie-dyed bandhani scarf in neon electric shades. Versatile accessory — wear as scarf, top, or headwrap.";
        category = "accessories";
        imageUrl = "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600";
        variants = [
          { size = null; color = ?"Electric Lime" },
          { size = null; color = ?"Hot Pink" },
          { size = null; color = ?"Neon Blue" },
        ];
        stockQuantity = 2;
      },
    ];

    for (p in placeholders.vals()) {
      // Only seed if not already present
      if (not products.containsKey(p.id)) {
        products.add(p.id, p);
      };
    };
  };
};
