const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <i className="bi bi-check-circle-fill text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Order Receipt</h3>
          </div>
        </div>
        <div className="px-6 py-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-900">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-900">{orderDetails.phoneNumber}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h5 className="mb-3 text-sm font-semibold text-gray-900">Items Ordered</h5>
            <div className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-3 max-h-48 overflow-y-auto">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name} x{item.quantity}</span>
                  <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-900">₹{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (1%):</span>
              <span className="font-medium text-gray-900">₹{orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-semibold text-gray-900">Grand Total:</span>
              <span className="text-lg font-bold text-gray-900">₹{orderDetails.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                orderDetails.paymentMethod === "CASH" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}>
                {orderDetails.paymentMethod}
              </span>
            </div>
            {orderDetails.paymentMethod === "UPI" && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Razorpay Order ID:</span>
                  <span className="font-mono text-xs text-gray-900">{orderDetails.razorpayOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Razorpay Payment ID:</span>
                  <span className="font-mono text-xs text-gray-900">{orderDetails.razorpayPaymentId}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onPrint}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPopup