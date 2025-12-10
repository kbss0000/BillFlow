import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Banknote, Check, Wallet } from "lucide-react"
import toast from "react-hot-toast"
import { AppContext } from "../../context/AppContext"
import { createOrder } from "../../Service/OrderService.js"
import { createRazorpayOrder, verifyPayment } from "../../Service/PaymentService.js"
import { AppConstants } from "../../util/constants.js"

const CartSummary = ({ customerData }) => {
  const { cartItems, clearCart } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("CASH")

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax

  const handleRazorpayPayment = async (orderData, createdOrder) => {
    try {
      // Create Razorpay order
      const razorpayOrderResponse = await createRazorpayOrder({
        amount: total,
        currency: "INR"
      })

      const options = {
        key: AppConstants.RAZORPAY_KEY_ID,
        amount: razorpayOrderResponse.data.amount,
        currency: razorpayOrderResponse.data.currency,
        name: "BillFlow",
        description: `Order #${createdOrder.orderId}`,
        order_id: razorpayOrderResponse.data.id,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: createdOrder.orderId
            })
            toast.success("Payment successful! Order placed.")
            clearCart()
          } catch (error) {
            console.error("Payment verification failed:", error)
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: customerData.customerName,
          contact: customerData.phoneNumber
        },
        theme: {
          color: "#3b82f6"
        },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled")
            setLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Failed to create Razorpay order:", error)
      toast.error("Failed to initiate payment")
      setLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    if (!customerData.customerName) {
      toast.error("Please enter customer name")
      return
    }
    if (cartItems.length === 0) {
      toast.error("Cart is empty")
      return
    }

    setLoading(true)
    try {
      const orderData = {
        customerName: customerData.customerName,
        phoneNumber: customerData.phoneNumber,
        items: cartItems.map(item => ({
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal,
        tax,
        grandTotal: total,
        paymentMethod
      }

      const response = await createOrder(orderData)

      if (paymentMethod === "ONLINE") {
        // Handle Razorpay payment
        await handleRazorpayPayment(orderData, response.data)
      } else {
        // Cash or UPI - complete immediately
        toast.success("Order placed successfully!")
        clearCart()
        setLoading(false)
      }
    } catch (error) {
      console.error("Failed to place order:", error)
      toast.error("Failed to place order")
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-[#262626] pt-6">
      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-3">
          Payment Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setPaymentMethod("CASH")}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${paymentMethod === "CASH"
              ? "bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6]"
              : "bg-[#111111] border-[#1f1f1f] text-[#737373] hover:border-[#262626]"
              }`}
          >
            <Banknote className="w-4 h-4" />
            <span className="text-xs font-medium">Cash</span>
          </button>
          <button
            onClick={() => setPaymentMethod("UPI")}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${paymentMethod === "UPI"
              ? "bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6]"
              : "bg-[#111111] border-[#1f1f1f] text-[#737373] hover:border-[#262626]"
              }`}
          >
            <CreditCard className="w-4 h-4" />
            <span className="text-xs font-medium">UPI</span>
          </button>
          <button
            onClick={() => setPaymentMethod("ONLINE")}
            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl border transition-all ${paymentMethod === "ONLINE"
              ? "bg-[#3b82f6]/10 border-[#3b82f6] text-[#3b82f6]"
              : "bg-[#111111] border-[#1f1f1f] text-[#737373] hover:border-[#262626]"
              }`}
          >
            <Wallet className="w-4 h-4" />
            <span className="text-xs font-medium">Online</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#737373]">Subtotal</span>
          <span className="text-white">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#737373]">Tax (5%)</span>
          <span className="text-white">₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-[#262626]">
          <span className="text-white font-medium">Total</span>
          <span className="text-[#3b82f6] text-xl font-semibold">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handlePlaceOrder}
        disabled={loading || cartItems.length === 0}
        className="w-full btn-premium py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            {paymentMethod === "ONLINE" ? "Pay Now" : "Place Order"}
          </>
        )}
      </motion.button>
    </div>
  )
}

export default CartSummary