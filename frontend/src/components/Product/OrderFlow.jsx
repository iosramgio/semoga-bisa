import { FaTshirt, FaRulerCombined, FaComments, FaCreditCard, FaIndustry, FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaTshirt size={24} className="text-white" />, label: 'Pilih Produk',
  },
  {
    icon: <FaRulerCombined size={24} className="text-white" />, label: 'Ukuran, Warna, Desain',
  },
  {
    icon: <FaComments size={24} className="text-white" />, label: 'Konsultasi Admin (Opsional)',
  },
  {
    icon: <FaCreditCard size={24} className="text-white" />, label: 'Checkout & DP',
  },
  {
    icon: <FaIndustry size={24} className="text-white" />, label: 'Proses Konveksi',
  },
  {
    icon: <FaBoxOpen size={24} className="text-white" />, label: 'Pelunasan & Kirim',
  },
];

const OrderFlow = () => {
  return (
    <div className="w-full overflow-hidden px-4 py-10 bg-gray-50">
      <h2 className="text-center text-4xl font-extrabold mb-6 text-gray-900 leading-tight pb-8">Cara Order</h2>
      <div className="relative max-w-6xl mx-auto">
        <svg width="100%" height="120" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-10 left-0 z-0">
          <path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60"
            stroke="#dc2626"
            strokeWidth="4"
            fill="none"
            strokeDasharray="2000"
            strokeDashoffset="2000"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="2000"
              to="0"
              dur="2s"
              fill="freeze"
            />
          </path>
        </svg>

        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center w-28 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg mb-2">
                {step.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderFlow;