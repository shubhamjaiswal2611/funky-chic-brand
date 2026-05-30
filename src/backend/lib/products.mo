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

  // Seed 12 placeholder products matching AltInstinct series
  public func seedProducts(products : Map.Map<Text, Types.Product>) : () {
    let placeholders : [Types.Product] = [
      {
        id = "p1";
        name = "Social Battery: 3%";
        price = 8999;
        description = "Hoodie for when your social battery is critically low. Oversized fit, heavyweight fleece with diagnostic print.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600";
        variants = [
          { size = ?"S"; color = ?"Neon Black" },
          { size = ?"M"; color = ?"Neon Black" },
          { size = ?"L"; color = ?"Neon Black" },
          { size = ?"XL"; color = ?"Neon Black" },
        ];
        stockQuantity = 42;
        emotion = "Chaos";
        series = "Social Battery Series";
      },
      {
        id = "p2";
        name = "Recharge Failed";
        price = 7499;
        description = "When rest doesn't restore. Graphic tee featuring battery UI and emotional diagnostics in infrared red.";
        category = "tees";
        imageUrl = "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600";
        variants = [
          { size = ?"S"; color = ?"Infrared" },
          { size = ?"M"; color = ?"Infrared" },
          { size = ?"L"; color = ?"Infrared" },
          { size = ?"XL"; color = ?"Infrared" },
        ];
        stockQuantity = 28;
        emotion = "Chaos";
        series = "Social Battery Series";
      },
      {
        id = "p3";
        name = "Interaction Overload";
        price = 6499;
        description = "Signal systems overloaded. Shorts with minimal symbolic print and utility pockets.";
        category = "shorts";
        imageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600";
        variants = [
          { size = ?"S"; color = ?"Static Grey" },
          { size = ?"M"; color = ?"Static Grey" },
          { size = ?"L"; color = ?"Static Grey" },
          { size = ?"XL"; color = ?"Static Grey" },
        ];
        stockQuantity = 15;
        emotion = "Chaos";
        series = "Social Battery Series";
      },
      {
        id = "p4";
        name = "Missing Identity";
        price = 9499;
        description = "Corrupted face hoodie. VHS texture distortion printed across oversized silhouette in cold blue.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600";
        variants = [
          { size = ?"S"; color = ?"Cold Blue" },
          { size = ?"M"; color = ?"Cold Blue" },
          { size = ?"L"; color = ?"Cold Blue" },
          { size = ?"XL"; color = ?"Cold Blue" },
        ];
        stockQuantity = 3;
        emotion = "Isolation";
        series = "Memory Corruption Series";
      },
      {
        id = "p5";
        name = "Memory Leak";
        price = 7999;
        description = "Disappearing humans, pixel erosion. Oversized tee capturing the feeling of losing yourself.";
        category = "tees";
        imageUrl = "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600";
        variants = [
          { size = ?"S"; color = ?"Void Black" },
          { size = ?"M"; color = ?"Void Black" },
          { size = ?"L"; color = ?"Void Black" },
          { size = ?"XL"; color = ?"Void Black" },
        ];
        stockQuantity = 20;
        emotion = "Isolation";
        series = "Memory Corruption Series";
      },
      {
        id = "p6";
        name = "Between Dreams";
        price = 10999;
        description = "Floating rooms, impossible stairs. Dreamstate hoodie in lavender — surreal architecture printed across the back.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600";
        variants = [
          { size = ?"XS"; color = ?"Lavender" },
          { size = ?"S"; color = ?"Lavender" },
          { size = ?"M"; color = ?"Lavender" },
          { size = ?"L"; color = ?"Lavender" },
        ];
        stockQuantity = 55;
        emotion = "Escape";
        series = "Dreamstate Series";
      },
      {
        id = "p7";
        name = "Artificial Reality";
        price = 8299;
        description = "Sleep division tee. Dream dimensions meet digital humanity in this surreal lavender graphic.";
        category = "tees";
        imageUrl = "https://images.unsplash.com/photo-1594938298603-c8148c4b4169?w=600";
        variants = [
          { size = ?"S"; color = ?"Dream Lavender" },
          { size = ?"M"; color = ?"Dream Lavender" },
          { size = ?"L"; color = ?"Dream Lavender" },
        ];
        stockQuantity = 8;
        emotion = "Escape";
        series = "Dreamstate Series";
      },
      {
        id = "p8";
        name = "Emotion Overload";
        price = 9299;
        description = "Fake system alerts layered over oversized lowers. Human error detected — violet UI warnings across the waistband.";
        category = "lowers";
        imageUrl = "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600";
        variants = [
          { size = ?"S"; color = ?"Overthinking Violet" },
          { size = ?"M"; color = ?"Overthinking Violet" },
          { size = ?"L"; color = ?"Overthinking Violet" },
        ];
        stockQuantity = 12;
        emotion = "Overthinking";
        series = "Human Error Series";
      },
      {
        id = "p9";
        name = "Human System Failure";
        price = 11499;
        description = "Stability corrupted hoodie. Emotional report UI printed across front in glitch violet.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600";
        variants = [
          { size = ?"S"; color = ?"Glitch Violet" },
          { size = ?"M"; color = ?"Glitch Violet" },
          { size = ?"L"; color = ?"Glitch Violet" },
          { size = ?"XL"; color = ?"Glitch Violet" },
        ];
        stockQuantity = 4;
        emotion = "Overthinking";
        series = "Human Error Series";
      },
      {
        id = "p10";
        name = "Obsession Protocol";
        price = 8999;
        description = "Instinct symbol tee in toxic green. Obsession made wearable — minimal chest symbol, large back drop.";
        category = "tees";
        imageUrl = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600";
        variants = [
          { size = ?"S"; color = ?"Toxic Green" },
          { size = ?"M"; color = ?"Toxic Green" },
          { size = ?"L"; color = ?"Toxic Green" },
          { size = ?"XL"; color = ?"Toxic Green" },
        ];
        stockQuantity = 30;
        emotion = "Obsession";
        series = "Instinct Protocol Series";
      },
      {
        id = "p11";
        name = "Silence Instinct";
        price = 7999;
        description = "Symbolic language hoodie — chaos, silence, attachment rendered as instinct symbols in toxic green.";
        category = "hoodies";
        imageUrl = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600";
        variants = [
          { size = ?"XS"; color = ?"Toxic Green" },
          { size = ?"S"; color = ?"Toxic Green" },
          { size = ?"M"; color = ?"Toxic Green" },
          { size = ?"L"; color = ?"Toxic Green" },
        ];
        stockQuantity = 18;
        emotion = "Obsession";
        series = "Instinct Protocol Series";
      },
      {
        id = "p12";
        name = "Emotional Burnout Lowers";
        price = 7499;
        description = "Ash grey utility lowers for the emotionally depleted. Burnout made uniform — minimal print, maximum comfort.";
        category = "lowers";
        imageUrl = "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600";
        variants = [
          { size = ?"S"; color = ?"Ash Grey" },
          { size = ?"M"; color = ?"Ash Grey" },
          { size = ?"L"; color = ?"Ash Grey" },
          { size = ?"XL"; color = ?"Ash Grey" },
        ];
        stockQuantity = 2;
        emotion = "Burnout";
        series = "Human Error Series";
      },
    ];

    for (p in placeholders.vals()) {
      // Only seed if not already present
      if (products.get(p.id) == null) {
        products.add(p.id, p);
      };
    };
  };
};
