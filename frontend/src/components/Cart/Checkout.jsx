import { useState } from "react"
import { useNavigate } from "react-router-dom"

const cart = {
    product: [
    {
        name: "t-shirt",
        size: "M",
        color: "Red",
        quantity:1,
        price: 15,
        image: "https://picsum.photos/200?random=1",
    },
    {
        name: "t-shirt",
        size: "S",
        color: "Green",
        quantity: 3,
        price: 113,
        image: "https://picsum.photos/200?random=2",
    },
],
totalPrice : 195,
}
const Checkout = () => {

    const navigate = useNavigate()
    const [checkoutId, setCheckoutId] = useState(null)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName:"",
        address:"",
        city: "",
        postalCode: "",
        phone:""
        
    })

    const handleCreateCheckout = (e) =>{
        e.preventDefault()
        setCheckoutId(123)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* section kiri */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg mb-4">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value="user@example.com" className="w-full p-2 border rounded" disabled />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Nama Depan</label>
                            <input
                            type="text"
                            value={shippingAddress.firstName}
                            onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                            className="w-full p-2 border rounded "
                            required/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Nama Belakang</label>
                            <input
                            type="text"
                            value={shippingAddress.lastName}
                            onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                            className="w-full p-2 border rounded "
                            required/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Alamat</label>
                        <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress,address: e.target.value})}
                        className="w-full p-2 border rounded"
                        required/>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                            <label className="block text-gray-700">Kota</label>
                            <input
                            type="text"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                            className="w-full p-2 border rounded "
                            required/>
                        </div>
                        <div>
                            <label className="block text-gray-700">Kode Pos</label>
                            <input
                            type="text"
                            value={shippingAddress.postalCode}
                            onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                            className="w-full p-2 border rounded "
                            required/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">No handphone</label>
                        <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress,phone: e.target.value})}
                        className="w-full p-2 border rounded"
                        required/>
                    </div>

                    {/* pembayaran payment */}
                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type="submit" className="w-full bg-black text-white py-3 rounded">Lanjut ke Pembayaran</button>
                        ):(
                            <div>
                                <h3 className="text-lg mb-4">Pay with paypal</h3>
                                {/* paypal component */}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout