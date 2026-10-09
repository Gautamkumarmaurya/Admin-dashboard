import DataPage from '../../components/common/DataPage';
import { getOrders } from '../../services/orderApi';

export default function Orders() {
  return (
    <DataPage
      title="Orders"
      description="Track and manage customer orders."
      loadData={getOrders}
      columns={[
        { key: 'id', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'date', label: 'Date' },
        { key: 'items', label: 'Items' },
        { key: 'total', label: 'Total', money: true },
        { key: 'payment', label: 'Payment', badge: true },
        { key: 'status', label: 'Status', badge: true },
      ]}
    />
  );
}