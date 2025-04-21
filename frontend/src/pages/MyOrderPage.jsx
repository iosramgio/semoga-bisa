import { useEffect, useState } from "react";
import { MdOutlinePendingActions, MdCheckCircle } from "react-icons/md";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi ambil data
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "123123",
          createdAt: new Date(),
          shippingAddress: { city: "Jakarta", country: "Indonesia" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=5",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "123456",
          createdAt: new Date(),
          shippingAddress: { city: "Jakarta", country: "Indonesia" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=6",
            },
          ],
          totalPrice: 100,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

      <div className="relative shadow-lg sm:rounded-xl bg-white overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-600">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Image</th>
              <th className="px-6 py-4 text-left font-semibold">Order ID</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Shipping</th>
              <th className="px-6 py-4 text-left font-semibold">Items</th>
              <th className="px-6 py-4 text-left font-semibold">Total</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Loading your orders...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    <span className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.country}
                  </td>
                  <td className="px-6 py-4">{order.orderItems.length}</td>
                  <td className="px-6 py-4 font-semibold">
                    Rp. {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? (
                        <>
                          <MdCheckCircle className="text-green-500" /> Paid
                        </>
                      ) : (
                        <>
                          <MdOutlinePendingActions className="text-yellow-500" /> Pending
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
