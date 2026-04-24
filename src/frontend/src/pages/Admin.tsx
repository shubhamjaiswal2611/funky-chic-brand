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
import { AlertTriangle, Package, Settings, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderStatus } from "../backend.d";
import AdminRoute from "../components/AdminRoute";
import AdminInventoryTab from "../components/admin/AdminInventoryTab";
import AdminOrdersTab from "../components/admin/AdminOrdersTab";
import AdminProductDialog from "../components/admin/AdminProductDialog";
import AdminProductsTab from "../components/admin/AdminProductsTab";
import { useBackend } from "../hooks/useBackend";
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
  const isFunky = mode === "funky";

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Product>(EMPTY_PRODUCT);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
