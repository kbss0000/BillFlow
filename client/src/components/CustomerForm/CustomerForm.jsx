const CustomerForm = ({ customerData, setCustomerData }) => {
  const handleChange = (e) => {
    setCustomerData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          value={customerData.customerName}
          onChange={handleChange}
          placeholder="Enter customer name"
          className="input-premium text-sm py-3"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={customerData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="input-premium text-sm py-3"
        />
      </div>
    </div>
  )
}

export default CustomerForm