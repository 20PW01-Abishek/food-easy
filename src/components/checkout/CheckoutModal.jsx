import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MdClose, MdLocationOn, MdMyLocation,MdPhone } from "react-icons/md";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateContext";
import { cldUrl } from "../../utils/cloudinary";
import { saveOrder } from "../../utils/firebaseFunctions";

// Fix default leaflet marker icons broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } },
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
};

const MapPicker = ({ position, onPick }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const address = await reverseGeocode(lat, lng);
      onPick({ lat, lng, address });
    },
  });
  return position ? <Marker position={[position.lat, position.lng]} /> : null;
};

const CheckoutModal = ({ tot, onClose }) => {
  const [{ user, cartItems }, dispatch] = useStateValue();
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [location, setLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India default
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        setMapCenter([coords.latitude, coords.longitude]);
      },
      () => {},
    );
  }, []);

  const handleUseMyLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        const address = await reverseGeocode(lat, lng);
        setLocation({ lat, lng, address });
        setMapCenter([lat, lng]);
      },
      () => alert("Could not get your location. Please tap on the map instead."),
    );
  };

  const clearCart = () => {
    dispatch({ type: actionType.SET_CARTITEMS, cartItems: [] });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const handlePlaceOrder = async () => {
    if (!phone.trim() || !location) return;
    setPlacing(true);
    try {
      await saveOrder({
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        items: cartItems,
        subtotal: tot,
        delivery: 2.5,
        total: tot + 2.5,
        phone: phone.trim(),
        location,
        status: "placed",
      });
      setSuccess(true);
      clearCart();
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error("Order failed:", err);
      setPlacing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {success ? (
          <div className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center text-white text-3xl">
              ✓
            </div>
            <p className="text-xl font-semibold text-headingColor">Order Placed!</p>
            <p className="text-muted text-sm text-center">
              Your order has been received. We'll deliver it soon.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <p className="text-lg font-semibold text-headingColor">Order Summary</p>
              <button onClick={onClose} className="text-muted hover:text-textColor cursor-pointer">
                <MdClose size={22} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              {/* Items */}
              <div className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={cldUrl(item.imageURL, { width: 150 })}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-textColor">{item.title}</p>
                        <p className="text-xs text-muted">× {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-sm text-textColor font-medium">
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-3 flex flex-col gap-1">
                <div className="flex justify-between text-sm text-muted">
                  <span>Sub Total</span>
                  <span>$ {tot.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Delivery</span>
                  <span>$ 2.50</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-textColor mt-1">
                  <span>Total</span>
                  <span>$ {(tot + 2.5).toFixed(2)}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-textColor flex items-center gap-1">
                  <MdPhone size={16} /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="border border-border rounded-lg px-3 py-2 text-sm text-textColor outline-none focus:border-foodEasyPrimary transition-colors"
                />
              </div>

              {/* Map picker */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-textColor flex items-center gap-1">
                    <MdLocationOn size={16} /> Delivery Location
                  </label>
                  <button
                    onClick={handleUseMyLocation}
                    className="flex items-center gap-1 text-xs text-foodEasyPrimary font-medium cursor-pointer hover:underline"
                  >
                    <MdMyLocation size={14} /> Use my location
                  </button>
                </div>

                <p className="text-xs text-muted">Tap on the map to drop a pin</p>

                <div className="rounded-xl overflow-hidden border border-border" style={{ height: 220, zIndex: 0 }}>
                  <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    key={mapCenter.join(",")}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <MapPicker position={location} onPick={setLocation} />
                  </MapContainer>
                </div>

                {location ? (
                  <p className="text-xs text-success flex items-start gap-1">
                    <MdLocationOn size={14} className="mt-0.5 flex-shrink-0" />
                    {location.address}
                  </p>
                ) : (
                  <p className="text-xs text-muted">No location selected yet</p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePlaceOrder}
                disabled={placing || !phone.trim() || !location}
                className="w-full py-3 rounded-full bg-foodEasyPrimary text-white font-semibold text-base mt-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
              >
                {placing ? "Placing Order…" : "Place Order"}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
