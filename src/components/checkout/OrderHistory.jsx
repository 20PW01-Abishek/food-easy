import React, { useEffect, useState } from "react";
import {
  MdAccessTime,
  MdLocationOn,
  MdPhone,
  MdShoppingBag,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../../context/StateContext";
import { getUserOrders } from "../../utils/firebaseFunctions";

const StatusBadge = () => (
  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-foodEasyPrimary text-xs font-semibold">
    Placed
  </span>
);

const OrderHistory = () => {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    getUserOrders(user.uid)
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <MdShoppingBag className="text-foodEasyPrimary text-2xl" />
          <h1 className="text-2xl font-bold text-headingColor">My Orders</h1>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-foodEasyPrimary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 py-16 text-error">
            <p className="text-base font-medium">Couldn't load your orders</p>
            <p className="text-xs text-muted">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-muted">
            <MdShoppingBag size={48} className="text-border" />
            <p className="text-lg font-medium">No orders yet</p>
            <p className="text-sm">Your past orders will appear here.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-border p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted text-sm">
                    <MdAccessTime size={16} />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <StatusBadge />
                </div>

                <div className="flex flex-col gap-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.imageURL}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-textColor truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted">
                          × {item.qty} &nbsp;·&nbsp; ${item.price}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-textColor">
                        ${(item.qty * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3 flex flex-col gap-1 text-sm">
                  {order.location?.address && (
                    <div className="flex items-start gap-1 text-muted">
                      <MdLocationOn
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-foodEasyPrimary"
                      />
                      <span>{order.location.address}</span>
                    </div>
                  )}
                  {order.phone && (
                    <div className="flex items-center gap-1 text-muted">
                      <MdPhone size={16} className="text-foodEasyPrimary" />
                      <span>{order.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm text-muted">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-base font-semibold text-foodEasyPrimary">
                    Total: ${order.total?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
