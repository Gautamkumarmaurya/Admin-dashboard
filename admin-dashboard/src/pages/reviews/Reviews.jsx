import DataPage from '../../components/common/DataPage';
import { getReviews } from '../../services/reviewApi';

export default function Reviews() {
  return (
    <DataPage
      title="Reviews"
      description="Moderate customer product feedback."
      loadData={getReviews}
      columns={[
        { key: 'customer', label: 'Customer' },
        { key: 'product', label: 'Product' },
        { key: 'rating', label: 'Rating' },
        { key: 'review', label: 'Review' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status', badge: true },
      ]}
    />
  );
}