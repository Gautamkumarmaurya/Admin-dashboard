import DataPage from '../../components/common/DataPage';
import { getPayments } from '../../services/paymentApi';

export default function Payments() {
  return (
    <DataPage
      title="Payments"
      description="Demo transaction history — no real payment processing."
      loadData={getPayments}
      columns={[
        { key: 'id', label: 'Transaction ID' },
        { key: 'order', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount', money: true },
        { key: 'method', label: 'Method' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status', badge: true },
      ]}
    />
  );
}