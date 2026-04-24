import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatus } from "../../backend.d";
import type { Order } from "../../types/index";

interface Props {
  orders: Order[];
  isLoading: boolean;
  isFunky: boolean;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "Pending",
  [OrderStatus.shipped]: "Shipped",
  [OrderStatus.delivered]: "Delivered",
  [OrderStatus.cancelled]: "Cancelled",
};

const STATUS_COLORS: Record<
  OrderStatus,
  { bg: string; fg: string; funkyBg: string; funkyFg: string }
> = {
  [OrderStatus.pending]: {
    bg: "oklch(0.76 0.18 72 / 0.12)",
    fg: "oklch(0.62 0.18 72)",
    funkyBg: "oklch(var(--lime) / 0.12)",
    funkyFg: "oklch(var(--lime))",
  },
  [OrderStatus.shipped]: {
    bg: "oklch(0.48 0.2 273 / 0.12)",
    fg: "oklch(0.48 0.2 273)",
    funkyBg: "oklch(var(--neonblue) / 0.12)",
    funkyFg: "oklch(var(--neonblue))",
  },
  [OrderStatus.delivered]: {
    bg: "oklch(0.55 0.2 165 / 0.12)",
    fg: "oklch(0.55 0.2 165)",
    funkyBg: "oklch(0.65 0.28 165 / 0.15)",
    funkyFg: "oklch(0.72 0.25 165)",
  },
  [OrderStatus.cancelled]: {
    bg: "oklch(var(--destructive) / 0.12)",
    fg: "oklch(var(--destructive))",
    funkyBg: "oklch(var(--hotpink) / 0.12)",
    funkyFg: "oklch(var(--hotpink))",
  },
};

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000; // nanoseconds → ms
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatPrincipal(principal: { toString: () => string }) {
  const s = principal.toString();
  if (s.length <= 10) return s;
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

export default function AdminOrdersTab({
  orders,
  isLoading,
  isFunky,
  onUpdateStatus,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <h2
        className="font-display font-bold uppercase tracking-wide text-sm mb-4"
        style={{ color: "oklch(var(--foreground))" }}
      >
        All Orders ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-16" data-ocid="admin.orders_empty_state">
          <p
            className="font-display text-lg font-bold uppercase"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            No orders yet
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: isFunky
              ? "2px solid oklch(var(--lime) / 0.4)"
              : "1px solid oklch(var(--border))",
            boxShadow: isFunky ? "0 0 20px oklch(var(--lime) / 0.10)" : "none",
          }}
        >
          {/* Header */}
          <div
            className="hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 text-xs font-body uppercase tracking-widest"
            style={{
              backgroundColor: isFunky
                ? "oklch(var(--lime) / 0.08)"
                : "oklch(var(--muted))",
              color: isFunky
                ? "oklch(var(--lime))"
                : "oklch(var(--muted-foreground))",
              borderBottom: isFunky
                ? "1px solid oklch(var(--lime) / 0.2)"
                : "1px solid oklch(var(--border))",
            }}
          >
            <span>Order ID · Customer</span>
            <span className="w-20 text-center">Items</span>
            <span className="w-24 text-right">Total</span>
            <span className="w-20 text-center">Date</span>
            <span className="w-32 text-center">Status</span>
          </div>

          {orders.map((order, i) => {
            const sc =
              STATUS_COLORS[order.status] ?? STATUS_COLORS[OrderStatus.pending];
            const badgeBg = isFunky ? sc.funkyBg : sc.bg;
            const badgeFg = isFunky ? sc.funkyFg : sc.fg;

            return (
              <div
                key={order.id}
                className="flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center px-4 py-4 transition-smooth"
                data-ocid={`admin.order.item.${i + 1}`}
                style={{
                  borderBottom:
                    i < orders.length - 1
                      ? isFunky
                        ? "1px solid oklch(var(--lime) / 0.06)"
                        : "1px solid oklch(var(--border))"
                      : "none",
                  backgroundColor:
                    i % 2 === 0
                      ? "oklch(var(--card))"
                      : isFunky
                        ? "oklch(var(--lime) / 0.02)"
                        : "oklch(var(--muted) / 0.3)",
                }}
              >
                {/* Order ID & customer */}
                <div className="min-w-0">
                  <p
                    className="font-mono text-xs"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    #{order.id.substring(0, 12)}…
                  </p>
                  <p
                    className="font-display font-bold text-xs uppercase mt-0.5 truncate"
                    style={{
                      color: isFunky
                        ? "oklch(var(--hotpink))"
                        : "oklch(var(--foreground))",
                    }}
                  >
                    {formatPrincipal(order.userId)}
                  </p>
                </div>

                {/* Items count */}
                <span
                  className="w-20 text-center font-mono text-sm font-bold"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </span>

                {/* Total */}
                <span
                  className="w-24 text-right font-mono font-bold text-sm"
                  style={{
                    color: isFunky
                      ? "oklch(var(--lime))"
                      : "oklch(var(--foreground))",
                  }}
                >
                  ${(Number(order.totalInCents) / 100).toFixed(2)}
                </span>

                {/* Date */}
                <span
                  className="w-20 text-center font-body text-xs"
                  style={{ color: "oklch(var(--muted-foreground))" }}
                >
                  {formatDate(order.createdAt)}
                </span>

                {/* Status dropdown */}
                <div className="w-32 flex justify-center">
                  <div className="relative">
                    <select
                      data-ocid={`admin.order_status.${i + 1}`}
                      value={order.status}
                      onChange={(e) =>
                        onUpdateStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="appearance-none font-body text-xs px-3 py-1.5 rounded-full cursor-pointer pr-6 font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: badgeBg,
                        color: badgeFg,
                        border: `1px solid ${badgeFg}40`,
                        outline: "none",
                      }}
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <option
                          key={status}
                          value={status}
                          style={{
                            backgroundColor: "oklch(var(--card))",
                            color: "oklch(var(--foreground))",
                          }}
                        >
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
