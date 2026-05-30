import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Clock,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus } from "../backend.d";
import AdminRoute from "../components/AdminRoute";
import AdminInventoryTab from "../components/admin/AdminInventoryTab";
import AdminOrdersTab from "../components/admin/AdminOrdersTab";
import AdminProductDialog from "../components/admin/AdminProductDialog";
import AdminProductsTab from "../components/admin/AdminProductsTab";
import { getLoreDrop, setLoreDrop, useBackend } from "../hooks/useBackend";
import { useThemeStore } from "../store/themeStore";
import type { Product } from "../types/index";

const EMPTY_PRODUCT: Product = {
  id: "",
  name: "",
  description: "",
  category: "Apparel",
  imageUrl: "",
  price: BigInt(0),
  stockQuantity: BigInt(0),
  variants: [],
  emotion: "",
  series: "",
};

function MandalaDecoration({ isFunky }: { isFunky: boolean }) {
  const color1 = isFunky
    ? "oklch(var(--lime) / 0.18)"
    : "oklch(var(--secondary) / 0.15)";
  const color2 = isFunky
    ? "oklch(var(--hotpink) / 0.12)"
    : "oklch(var(--primary) / 0.08)";

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute right-8 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none select-none"
    >
      <title>Decorative mandala motif</title>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="30"
          rx="4"
          ry="16"
          fill={color1}
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="42"
          rx="2.5"
          ry="10"
          fill={color2}
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      <circle cx="60" cy="60" r="8" fill={color1} />
      <circle cx="60" cy="60" r="4" fill={color2} />
    </svg>
  );
}

function BlockPrintBorder({ isFunky }: { isFunky: boolean }) {
  const c1 = isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))";
  const c2 = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";

  return (
    <div
      className="h-1.5 w-full"
      style={{
        background: `repeating-linear-gradient(
          90deg,
          ${c1} 0px, ${c1} 18px,
          ${c2} 18px, ${c2} 36px,
          transparent 36px, transparent 40px
        )`,
      }}
    />
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  alert,
  isFunky,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  alert?: boolean;
  isFunky: boolean;
}) {
  return (
    <div
      className="card-brand p-4 transition-smooth"
      style={{
        border:
          alert && isFunky
            ? "1px solid oklch(var(--destructive) / 0.5)"
            : undefined,
        boxShadow:
          alert && isFunky
            ? "0 0 12px oklch(var(--destructive) / 0.2)"
            : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon
          size={14}
          style={{
            color: alert
              ? "oklch(var(--destructive))"
              : isFunky
                ? "oklch(var(--lime))"
                : "oklch(var(--muted-foreground))",
          }}
        />
        <span
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: "oklch(var(--muted-foreground))" }}
        >
          {label}
        </span>
      </div>
      <p
        className="font-display text-3xl font-black leading-none"
        style={{
          color: alert
            ? "oklch(var(--destructive))"
            : isFunky
              ? "oklch(var(--lime))"
              : "oklch(var(--foreground))",
          textShadow:
            isFunky && !alert
              ? "0 0 16px oklch(var(--lime) / 0.4)"
              : isFunky && alert
                ? "0 0 16px oklch(var(--destructive) / 0.4)"
                : "none",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function AdminContent() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "signal";

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Product>(EMPTY_PRODUCT);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Lore Drop state ──
  const [dropDate, setDropDate] = useState("");
  const [dropTitle, setDropTitle] = useState("");
  const [_currentDrop, _setCurrentDrop] = useState<{
    targetTimestamp: bigint;
    title: string;
  } | null>(null);

  // ── Queries ──────────────────────────────────────────────────
  const { data: products = [], isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["admin-products"],
    queryFn: async () => (actor ? actor.getProducts() : []),
    enabled: !!actor,
  });

  const { data: lowStock = [] } = useQuery<Product[]>({
    queryKey: ["admin-low-stock"],
    queryFn: async () => (actor ? actor.adminGetLowStockProducts() : []),
    enabled: !!actor,
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (actor ? actor.adminGetAllOrders() : []),
    enabled: !!actor,
  });

  const { data: loreDropData, isLoading: loreDropLoading } = useQuery({
    queryKey: ["admin-lore-drop"],
    queryFn: async () => {
      if (!actor) return null;
      return getLoreDrop(actor);
    },
    enabled: !!actor,
  });

  // ── Mutations ─────────────────────────────────────────────────
  const addMutation = useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("No actor");
      await actor.adminAddProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      toast.success("Product added!");
    },
    onError: () => toast.error("Failed to add product"),
  });

  const updateMutation = useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error("No actor");
      await actor.adminUpdateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      toast.success("Product updated!");
    },
    onError: () => toast.error("Failed to update product"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.adminDeleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteId(null);
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.adminUpdateStock(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-low-stock"] });
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: string; status: OrderStatus }) => {
      if (!actor) throw new Error("No actor");
      return actor.adminUpdateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const loreDropMutation = useMutation({
    mutationFn: async ({
      targetMs,
      title,
    }: { targetMs: number; title: string }) => {
      if (!actor) throw new Error("No actor");
      await setLoreDrop(actor, targetMs, title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lore-drop"] });
      toast.success("Lore drop saved!");
    },
    onError: () => toast.error("Failed to save lore drop"),
  });

  // ── Handlers ──────────────────────────────────────────────────
  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      ...formData,
      price: BigInt(Math.round(Number(formData.price))),
      stockQuantity: BigInt(Math.round(Number(formData.stockQuantity))),
    };
    if (editingProduct) {
      updateMutation.mutate(product);
    } else {
      addMutation.mutate({ ...product, id: crypto.randomUUID() });
    }
  };

  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.pending,
  ).length;

  const handleSaveLoreDrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropDate || !dropTitle.trim()) {
      toast.error("Please fill in both date and title");
      return;
    }
    const targetMs = new Date(dropDate).getTime();
    if (Number.isNaN(targetMs)) {
      toast.error("Invalid date");
      return;
    }
    loreDropMutation.mutate({ targetMs, title: dropTitle.trim() });
  };

  const formatLoreDropDate = (ts: bigint) => {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      {/* ── Cultural block-print top border ── */}
      <BlockPrintBorder isFunky={isFunky} />

      {/* ── Header ── */}
      <div
        className="relative overflow-hidden py-10 px-4"
        style={{
          backgroundColor: "oklch(var(--card))",
          borderBottom: isFunky
            ? "2px solid oklch(var(--hotpink) / 0.3)"
            : "1px solid oklch(var(--border))",
        }}
      >
        {/* Mandala decoration */}
        <MandalaDecoration isFunky={isFunky} />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <Settings
              size={20}
              style={{
                color: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))",
              }}
            />
            <h1
              className="heading-brand text-4xl md:text-5xl"
              style={{
                color: isFunky ? "oklch(var(--lime))" : "oklch(var(--indigo))",
                textShadow: isFunky
                  ? "0 0 20px oklch(var(--lime) / 0.4), 0 0 40px oklch(var(--lime) / 0.2)"
                  : "none",
              }}
            >
              Admin Panel
            </h1>
          </div>
          <p
            className="font-body text-sm mt-1 ml-8"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Manage products, inventory &amp; orders
          </p>
          {lowStock.length > 0 && (
            <div
              className="ml-8 mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold"
              style={{
                backgroundColor: "oklch(var(--destructive) / 0.12)",
                color: "oklch(var(--destructive))",
                border: "1px solid oklch(var(--destructive) / 0.3)",
              }}
            >
              <AlertTriangle size={11} />
              {lowStock.length} low-stock alert{lowStock.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Products"
            value={products.length}
            icon={ShoppingBag}
            isFunky={isFunky}
          />
          <StatCard
            label="Low Stock"
            value={lowStock.length}
            icon={AlertTriangle}
            alert={lowStock.length > 0}
            isFunky={isFunky}
          />
          <StatCard
            label="Total Orders"
            value={orders.length}
            icon={Package}
            isFunky={isFunky}
          />
          <StatCard
            label="Pending"
            value={pendingCount}
            icon={Package}
            alert={pendingCount > 0}
            isFunky={isFunky}
          />
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="products" data-ocid="admin.tabs">
          <TabsList
            className="mb-6 gap-1"
            style={{
              backgroundColor: "oklch(var(--muted))",
              border: isFunky
                ? "1px solid oklch(var(--hotpink) / 0.25)"
                : undefined,
            }}
          >
            <TabsTrigger
              value="products"
              data-ocid="admin.products_tab"
              className="font-body uppercase tracking-widest text-xs font-semibold"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              data-ocid="admin.inventory_tab"
              className="font-body uppercase tracking-widest text-xs font-semibold"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              data-ocid="admin.orders_tab"
              className="font-body uppercase tracking-widest text-xs font-semibold"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="lore"
              data-ocid="admin.lore_tab"
              className="font-body uppercase tracking-widest text-xs font-semibold"
            >
              Lore Drop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <AdminProductsTab
              products={products}
              isLoading={productsLoading}
              isFunky={isFunky}
              onAdd={openAddDialog}
              onEdit={openEditDialog}
              onDelete={(id) => setDeleteId(id)}
            />
          </TabsContent>

          <TabsContent value="inventory">
            <AdminInventoryTab
              products={products}
              lowStock={lowStock}
              isFunky={isFunky}
              onUpdateStock={async (id, quantity) => {
                await updateStockMutation.mutateAsync({ id, quantity });
              }}
            />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrdersTab
              orders={orders}
              isLoading={ordersLoading}
              isFunky={isFunky}
              onUpdateStatus={(orderId, status) =>
                updateOrderStatusMutation.mutate({ orderId, status })
              }
            />
          </TabsContent>

          <TabsContent value="lore">
            <div
              className="card-brand p-6 md:p-8"
              data-ocid="admin.lore_drop.panel"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock
                  size={20}
                  style={{
                    color: isFunky
                      ? "oklch(var(--lime))"
                      : "oklch(var(--primary))",
                  }}
                />
                <h2
                  className="heading-brand text-xl md:text-2xl"
                  style={{
                    color: isFunky
                      ? "oklch(var(--lime))"
                      : "oklch(var(--foreground))",
                    textShadow: isFunky
                      ? "0 0 12px oklch(var(--lime) / 0.4)"
                      : "none",
                  }}
                >
                  Lore Drop Schedule
                </h2>
              </div>

              {loreDropLoading ? (
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  Loading current drop…
                </p>
              ) : loreDropData ? (
                <div
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: isFunky
                      ? "oklch(var(--lime) / 0.08)"
                      : "oklch(var(--primary) / 0.06)",
                    border: isFunky
                      ? "1px solid oklch(var(--lime) / 0.25)"
                      : "1px solid oklch(var(--primary) / 0.2)",
                  }}
                >
                  <p
                    className="font-body text-xs uppercase tracking-widest mb-1"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Current Countdown Target
                  </p>
                  <p
                    className="font-display text-lg font-bold"
                    style={{
                      color: isFunky
                        ? "oklch(var(--lime))"
                        : "oklch(var(--primary))",
                    }}
                  >
                    {loreDropData.title}
                  </p>
                  <p
                    className="font-mono text-sm mt-1"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    {formatLoreDropDate(loreDropData.targetTimestamp)}
                  </p>
                </div>
              ) : (
                <div
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: "oklch(var(--muted) / 0.4)",
                    border: "1px solid oklch(var(--border))",
                  }}
                >
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    No lore drop scheduled yet.
                  </p>
                </div>
              )}

              <form onSubmit={handleSaveLoreDrop} className="space-y-5">
                <div>
                  <label
                    htmlFor="drop-date"
                    className="block font-body text-xs uppercase tracking-widest mb-2"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Target Launch Date
                  </label>
                  <input
                    id="drop-date"
                    type="datetime-local"
                    value={dropDate}
                    onChange={(e) => setDropDate(e.target.value)}
                    required
                    data-ocid="admin.lore_drop.date_input"
                    className="w-full rounded-md px-3 py-2.5 font-body text-sm outline-none transition-smooth"
                    style={{
                      backgroundColor: "oklch(var(--input))",
                      color: "oklch(var(--foreground))",
                      border: isFunky
                        ? "1px solid oklch(var(--border) / 0.6)"
                        : "1px solid oklch(var(--border))",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="drop-title"
                    className="block font-body text-xs uppercase tracking-widest mb-2"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    Drop Title
                  </label>
                  <input
                    id="drop-title"
                    type="text"
                    value={dropTitle}
                    onChange={(e) => setDropTitle(e.target.value)}
                    placeholder="DROP_004 — Memory Fragment"
                    required
                    data-ocid="admin.lore_drop.title_input"
                    className="w-full rounded-md px-3 py-2.5 font-body text-sm outline-none transition-smooth"
                    style={{
                      backgroundColor: "oklch(var(--input))",
                      color: "oklch(var(--foreground))",
                      border: isFunky
                        ? "1px solid oklch(var(--border) / 0.6)"
                        : "1px solid oklch(var(--border))",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loreDropMutation.isPending}
                  data-ocid="admin.lore_drop.save_button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-body text-sm font-semibold uppercase tracking-wider transition-smooth"
                  style={{
                    backgroundColor: isFunky
                      ? "oklch(var(--lime))"
                      : "oklch(var(--primary))",
                    color: isFunky
                      ? "oklch(var(--nearblack))"
                      : "oklch(var(--primary-foreground))",
                    boxShadow: isFunky
                      ? "0 0 16px oklch(var(--lime) / 0.4)"
                      : "none",
                  }}
                >
                  {loreDropMutation.isPending ? "Saving…" : "Save Drop Date"}
                </button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Product add/edit dialog ── */}
      <AdminProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingProduct={editingProduct}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleFormSubmit}
        isPending={addMutation.isPending || updateMutation.isPending}
        isFunky={isFunky}
      />

      {/* ── Delete confirmation ── */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent data-ocid="admin.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle
              className="font-display font-bold uppercase tracking-wide"
              style={{
                color: isFunky
                  ? "oklch(var(--hotpink))"
                  : "oklch(var(--foreground))",
              }}
            >
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription
              className="font-body text-sm"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.delete_confirm_button"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
              style={{
                backgroundColor: "oklch(var(--destructive))",
                color: "oklch(var(--destructive-foreground))",
                border: "none",
              }}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function Admin() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}
