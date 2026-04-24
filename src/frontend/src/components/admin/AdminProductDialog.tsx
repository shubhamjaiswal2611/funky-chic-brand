import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "../../types/index";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product | null;
  formData: Product;
  onChange: (data: Product) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  isFunky: boolean;
}

export default function AdminProductDialog({
  open,
  onOpenChange,
  editingProduct,
  formData,
  onChange,
  onSubmit,
  isPending,
  isFunky,
}: Props) {
  const accentColor = isFunky
    ? "oklch(var(--hotpink))"
    : "oklch(var(--primary))";
  const accentFg = isFunky
    ? "oklch(0.05 0 0)"
    : "oklch(var(--primary-foreground))";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="admin.product_dialog"
        style={{
          border: isFunky ? "2px solid oklch(var(--hotpink) / 0.5)" : undefined,
          boxShadow: isFunky
            ? "0 0 40px oklch(var(--hotpink) / 0.2)"
            : undefined,
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="font-display font-bold uppercase tracking-wide"
            style={{
              color: isFunky
                ? "oklch(var(--lime))"
                : "oklch(var(--foreground))",
            }}
          >
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="font-body text-xs uppercase tracking-widest">
              Product Name *
            </Label>
            <Input
              data-ocid="admin.product_name_input"
              required
              value={formData.name}
              onChange={(e) => onChange({ ...formData, name: e.target.value })}
              placeholder="Neon Riot Jacket"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="font-body text-xs uppercase tracking-widest">
              Description *
            </Label>
            <Textarea
              data-ocid="admin.product_description_input"
              required
              value={formData.description}
              onChange={(e) =>
                onChange({ ...formData, description: e.target.value })
              }
              placeholder="Product description…"
              rows={3}
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="font-body text-xs uppercase tracking-widest">
                Category *
              </Label>
              <Input
                data-ocid="admin.product_category_input"
                required
                value={formData.category}
                onChange={(e) =>
                  onChange({ ...formData, category: e.target.value })
                }
                placeholder="Apparel"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-xs uppercase tracking-widest">
                Price (cents) *
              </Label>
              <Input
                data-ocid="admin.product_price_input"
                type="number"
                required
                min={0}
                value={Number(formData.price)}
                onChange={(e) =>
                  onChange({ ...formData, price: BigInt(e.target.value || 0) })
                }
                placeholder="9900"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-1.5">
            <Label className="font-body text-xs uppercase tracking-widest">
              Stock Quantity *
            </Label>
            <Input
              data-ocid="admin.product_stock_input"
              type="number"
              required
              min={0}
              value={Number(formData.stockQuantity)}
              onChange={(e) =>
                onChange({
                  ...formData,
                  stockQuantity: BigInt(e.target.value || 0),
                })
              }
              placeholder="50"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label className="font-body text-xs uppercase tracking-widest">
              Image URL
            </Label>
            <Input
              data-ocid="admin.product_image_input"
              value={formData.imageUrl}
              onChange={(e) =>
                onChange({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://…"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              data-ocid="admin.product_dialog_cancel"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="admin.product_dialog_submit"
              disabled={isPending}
              style={{
                backgroundColor: accentColor,
                color: accentFg,
                border: "none",
              }}
            >
              {isPending
                ? "Saving…"
                : editingProduct
                  ? "Save Changes"
                  : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
