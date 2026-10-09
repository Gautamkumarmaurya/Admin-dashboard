import DataPage from '../../components/common/DataPage';
import { getCustomers } from '../../services/customerApi';

export default function Customers() {
  return (
    <DataPage
      title="Customers"
      description="Customer profiles, spending and activity."
      loadData={getCustomers}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'orders', label: 'Orders' },
        { key: 'spent', label: 'Total Spent', money: true },
        { key: 'status', label: 'Status', badge: true },
        { key: 'joined', label: 'Joined' },
      ]}
    />
  );
}