import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../types/index";

interface Props {
  products: Product[];
  lowStock: Product[];
  isFunky: boolean;
  onUpdateStock: (id: string, quantity: bigint) => Promise<void>;
}

function StockRow({
  product,
  index,
  isFunky,
  onUpdateStock,
}: {
  product: Product;
  index: number;
  isFunky: boolean;
  onUpdateStock: (id: string, quantity: bigint) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(Number(product.stockQuantity)));
  const [saving, setSaving] = useState(false);

  const isLow = Number(product.stockQuantity) <= 5;

  const handleSave = async () => {
    const qty = Number.parseInt(value, 10);
    if (Number.isNaN(qty) || qty < 0) {
      toast.error("Invalid quantity");
      return;
    }
    setSaving(true);
    try {
      await onUpdateStock(product.id, BigInt(qty));
      setEditing(false);
      toast.success("Stock updated");
    } catch {
      toast.error("Failed to update stock");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="flex items-center gap-4 px-4 py-3 transition-smooth"
      data-ocid={`admin.inventory.item.${index + 1}`}
      style={{
        borderBottom:
          index % 2 === 0
            ? isFunky
              ? "1px solid oklch(var(--lime) / 0.08)"
              : "1px solid oklch(var(--border))"
            : "none",
        backgroundColor:
          index % 2 === 0
            ? "oklch(var(--card))"
            : isFunky
              ? "oklch(var(--lime) / 0.03)"
              : "oklch(var(--muted) / 0.3)",
      }}
    >
      {/* Product name */}
      <div className="flex-1 min-w-0">
        <p
          className="font-display font-bold uppercase text-sm truncate"
          style={{
            color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))",
          }}
        >
          {product.name}
        </p>
        <p
          className="font-body text-xs"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {product.category}
        </p>
      </div>

      {/* Low stock badge */}
      {isLow && (
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold"
          style={{
            backgroundColor: "oklch(var(--destructive) / 0.12)",
            color: "oklch(var(--destructive))",
            border: "1px solid oklch(var(--destructive) / 0.3)",
          }}
        >
          <AlertTriangle size={11} />
          LOW
        </div>
      )}

      {/* Stock editor */}
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <Input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-20 h-7 text-center font-mono text-sm"
              data-ocid={`admin.inventory_stock_input.${index + 1}`}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setEditing(false);
                  setValue(String(Number(product.stockQuantity)));
                }
              }}
            />
            <Button
              size="icon"
              className="h-7 w-7"
              disabled={saving}
              onClick={handleSave}
              aria-label="Save stock"
              data-ocid={`admin.inventory_save.${index + 1}`}
              style={{
                backgroundColor: isFunky
                  ? "oklch(var(--lime))"
                  : "oklch(var(--primary))",
                color: isFunky
                  ? "oklch(0.05 0 0)"
                  : "oklch(var(--primary-foreground))",
                border: "none",
              }}
            >
              {saving ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <Check size={12} />
              )}
            </Button>
          </>
        ) : (
          <>
            <span
              className="font-mono font-bold text-sm w-16 text-right"
              style={{
                color: isLow
                  ? "oklch(var(--destructive))"
                  : isFunky
                    ? "oklch(var(--hotpink))"
                    : "oklch(var(--foreground))",
              }}
            >
              {Number(product.stockQuantity)} units
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 transition-smooth"
              onClick={() => {
                setValue(String(Number(product.stockQuantity)));
                setEditing(true);
              }}
              aria-label="Edit stock"
              data-ocid={`admin.inventory_edit.${index + 1}`}
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              <RefreshCw size={12} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminInventoryTab({
  products,
  lowStock,
  isFunky,
  onUpdateStock,
}: Props) {
  return (
    <>
      <h2
        className="font-display font-bold uppercase tracking-wide text-sm mb-4"
        style={{ color: "oklch(var(--foreground))" }}
      >
        Inventory Overview ({products.length} products)
      </h2>

      {/* Low stock alert banner */}
      {lowStock.length > 0 && (
        <div
          className="mb-6 p-4 rounded-xl flex items-start gap-3"
          style={{
            backgroundColor: "oklch(var(--destructive) / 0.08)",
            border: "1px solid oklch(var(--destructive) / 0.3)",
            boxShadow: isFunky
              ? "0 0 16px oklch(var(--destructive) / 0.15)"
              : "none",
          }}
        >
          <AlertTriangle
            size={16}
            className="mt-0.5 flex-shrink-0"
            style={{ color: "oklch(var(--destructive))" }}
          />
          <div>
            <p
              className="font-display font-bold text-sm uppercase tracking-wide"
              style={{ color: "oklch(var(--destructive))" }}
            >
              {lowStock.length} item{lowStock.length > 1 ? "s" : ""} critically
              low on stock
            </p>
            <p
              className="font-body text-xs mt-0.5 line-clamp-2"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              {lowStock.map((p) => p.name).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {/* Inventory table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: isFunky
            ? "2px solid oklch(var(--neonblue) / 0.4)"
            : "1px solid oklch(var(--border))",
          boxShadow: isFunky
            ? "0 0 20px oklch(var(--neonblue) / 0.12)"
            : "none",
        }}
      >
        {/* Header row */}
        <div
          className="flex items-center px-4 py-3 text-xs font-body uppercase tracking-widest"
          style={{
            backgroundColor: isFunky
              ? "oklch(var(--neonblue) / 0.10)"
              : "oklch(var(--muted))",
            color: isFunky
              ? "oklch(var(--neonblue))"
              : "oklch(var(--muted-foreground))",
            borderBottom: isFunky
              ? "1px solid oklch(var(--neonblue) / 0.25)"
              : "1px solid oklch(var(--border))",
          }}
        >
          <span className="flex-1">Product</span>
          <span className="mr-20">Status</span>
          <span>Stock · Edit</span>
        </div>

        {products.map((product, i) => (
          <StockRow
            key={product.id}
            product={product}
            index={i}
            isFunky={isFunky}
            onUpdateStock={onUpdateStock}
          />
        ))}

        {products.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            <p className="font-body text-sm">No inventory data</p>
          </div>
        )}
      </div>
    </>
  );
}
