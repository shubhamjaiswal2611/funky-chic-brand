import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Plus, Trash2 } from "lucide-react";
import type { Product } from "../../types/index";

interface Props {
  products: Product[];
  isLoading: boolean;
  isFunky: boolean;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function AdminProductsTab({
  products,
  isLoading,
  isFunky,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const accentColor = isFunky
    ? "oklch(var(--hotpink))"
    : "oklch(var(--primary))";
  const accentFg = isFunky
    ? "oklch(0.05 0 0)"
    : "oklch(var(--primary-foreground))";

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2
          className="font-display font-bold uppercase tracking-wide text-sm"
          style={{ color: "oklch(var(--foreground))" }}
        >
          All Products ({products.length})
        </h2>
        <Button
          data-ocid="admin.add_product_button"
          onClick={onAdd}
          size="sm"
          className="gap-2 font-body font-bold uppercase tracking-widest text-xs transition-smooth"
          style={{
            backgroundColor: accentColor,
            color: accentFg,
            border: "none",
          }}
        >
          <Plus size={14} /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="text-center py-16"
          data-ocid="admin.products_empty_state"
        >
          <p
            className="font-display text-lg font-bold uppercase"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            No products yet
          </p>
          <Button onClick={onAdd} className="mt-4" size="sm">
            Add your first product
          </Button>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: isFunky
              ? "2px solid oklch(var(--hotpink) / 0.5)"
              : "1px solid oklch(var(--border))",
            boxShadow: isFunky
              ? "0 0 24px oklch(var(--hotpink) / 0.15)"
              : "none",
          }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 px-4 py-3 text-xs font-body uppercase tracking-widest"
            style={{
              backgroundColor: isFunky
                ? "oklch(var(--hotpink) / 0.12)"
                : "oklch(var(--muted))",
              color: isFunky
                ? "oklch(var(--hotpink))"
                : "oklch(var(--muted-foreground))",
              borderBottom: isFunky
                ? "1px solid oklch(var(--hotpink) / 0.3)"
                : "1px solid oklch(var(--border))",
            }}
          >
            <span className="w-10">Img</span>
            <span>Name</span>
            <span className="w-20 text-center">Category</span>
            <span className="w-16 text-right">Price</span>
            <span className="w-14 text-right">Stock</span>
            <span className="w-16 text-center">Actions</span>
          </div>

          {products.map((product, i) => (
            <div
              key={product.id}
              className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-3 transition-smooth"
              data-ocid={`admin.product.item.${i + 1}`}
              style={{
                borderBottom:
                  i < products.length - 1
                    ? isFunky
                      ? "1px solid oklch(var(--lime) / 0.08)"
                      : "1px solid oklch(var(--border))"
                    : "none",
                backgroundColor:
                  i % 2 === 0
                    ? "oklch(var(--card))"
                    : isFunky
                      ? "oklch(var(--lime) / 0.03)"
                      : "oklch(var(--muted) / 0.3)",
              }}
            >
              {/* Image */}
              <div
                className="w-10 h-10 rounded flex-shrink-0 overflow-hidden"
                style={{
                  border: isFunky
                    ? "1px solid oklch(var(--neonblue) / 0.3)"
                    : "1px solid oklch(var(--border))",
                }}
              >
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full pattern-block-print" />
                )}
              </div>

              {/* Name */}
              <p
                className="font-display font-bold uppercase text-sm leading-tight truncate min-w-0"
                style={{
                  color: isFunky
                    ? "oklch(var(--lime))"
                    : "oklch(var(--foreground))",
                }}
              >
                {product.name}
              </p>

              {/* Category */}
              <div className="w-20 flex justify-center">
                <Badge
                  className="text-xs border-0 truncate max-w-full"
                  style={{
                    backgroundColor: isFunky
                      ? "oklch(var(--neonblue) / 0.15)"
                      : "oklch(var(--muted))",
                    color: isFunky
                      ? "oklch(var(--neonblue))"
                      : "oklch(var(--muted-foreground))",
                  }}
                >
                  {product.category}
                </Badge>
              </div>

              {/* Price */}
              <p
                className="w-16 text-right font-mono text-sm font-bold"
                style={{
                  color: isFunky
                    ? "oklch(var(--hotpink))"
                    : "oklch(var(--foreground))",
                }}
              >
                ${(Number(product.price) / 100).toFixed(0)}
              </p>

              {/* Stock */}
              <p
                className="w-14 text-right font-mono text-sm font-bold"
                style={{
                  color:
                    Number(product.stockQuantity) <= 5
                      ? "oklch(var(--destructive))"
                      : isFunky
                        ? "oklch(var(--lime))"
                        : "oklch(var(--foreground))",
                }}
              >
                {Number(product.stockQuantity)}
              </p>

              {/* Actions */}
              <div className="w-16 flex gap-1 justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  data-ocid={`admin.edit_product.${i + 1}`}
                  onClick={() => onEdit(product)}
                  aria-label="Edit product"
                  className="h-7 w-7 transition-smooth"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  <Edit size={13} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  data-ocid={`admin.delete_product.${i + 1}`}
                  onClick={() => onDelete(product.id)}
                  aria-label="Delete product"
                  className="h-7 w-7 transition-smooth"
                  style={{ color: "oklch(var(--destructive))" }}
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
