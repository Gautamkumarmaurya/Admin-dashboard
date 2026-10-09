// Product data
export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    sku: "APL-15P-256",
    category: "Electronics",
    price: 999,
    stock: 18,
    status: "Active",
    rating: 4.8,
    created: "Oct 2, 2026",
  },
  {
    id: 2,
    name: "Nike Air Max",
    sku: "NKE-AM-001",
    category: "Shoes",
    price: 129,
    stock: 3,
    status: "Active",
    rating: 4.6,
    created: "Sep 28, 2026",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    sku: "SMS-S24-128",
    category: "Electronics",
    price: 899,
    stock: 22,
    status: "Active",
    rating: 4.7,
    created: "Sep 24, 2026",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    sku: "APL-AW9-45",
    category: "Electronics",
    price: 399,
    stock: 9,
    status: "Active",
    rating: 4.5,
    created: "Sep 20, 2026",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    sku: "AUD-WE-102",
    category: "Electronics",
    price: 89,
    stock: 5,
    status: "Active",
    rating: 4.3,
    created: "Sep 18, 2026",
  },
  {
    id: 6,
    name: "Skincare Kit",
    sku: "BTY-SK-310",
    category: "Beauty",
    price: 64,
    stock: 2,
    status: "Active",
    rating: 4.4,
    created: "Sep 12, 2026",
  },
  {
    id: 7,
    name: "Urban Backpack",
    sku: "ACC-BP-77",
    category: "Accessories",
    price: 79,
    stock: 4,
    status: "Active",
    rating: 4.2,
    created: "Sep 10, 2026",
  },
  {
    id: 8,
    name: "Minimal Desk Lamp",
    sku: "HOM-DL-14",
    category: "Home & Living",
    price: 54,
    stock: 31,
    status: "Draft",
    rating: 4.1,
    created: "Sep 7, 2026",
  },
];

// Order data
export const orders = [
  {
    id: "ORD-1028",
    customer: "Rahul Kumar",
    date: "Oct 8, 2026",
    items: 2,
    total: 249,
    payment: "Paid",
    status: "Pending",
  },
  {
    id: "ORD-1027",
    customer: "Priya Sharma",
    date: "Oct 7, 2026",
    items: 1,
    total: 599,
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "ORD-1026",
    customer: "Aman Verma",
    date: "Oct 7, 2026",
    items: 3,
    total: 129,
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "ORD-1025",
    customer: "Neha Singh",
    date: "Oct 6, 2026",
    items: 2,
    total: 899,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "ORD-1024",
    customer: "Rohan Gupta",
    date: "Oct 6, 2026",
    items: 1,
    total: 349,
    payment: "Paid",
    status: "Delivered",
  },
];

// Customer data
export const customers = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 98765 12001",
    orders: 12,
    spent: 2840,
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 12002",
    orders: 8,
    spent: 1998,
    status: "Active",
    joined: "Feb 8, 2026",
  },
  {
    id: 3,
    name: "Aman Verma",
    email: "aman@example.com",
    phone: "+91 98765 12003",
    orders: 5,
    spent: 974,
    status: "Active",
    joined: "Mar 17, 2026",
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha@example.com",
    phone: "+91 98765 12004",
    orders: 14,
    spent: 4250,
    status: "VIP",
    joined: "Jan 29, 2026",
  },
  {
    id: 5,
    name: "Rohan Gupta",
    email: "rohan@example.com",
    phone: "+91 98765 12005",
    orders: 3,
    spent: 640,
    status: "Inactive",
    joined: "May 11, 2026",
  },
];

// Payment data
export const payments = [
  {
    id: "TXN-84021",
    order: "ORD-1028",
    customer: "Rahul Kumar",
    amount: 249,
    method: "Visa •••• 4242",
    date: "Oct 8, 2026",
    status: "Success",
  },
  {
    id: "TXN-84020",
    order: "ORD-1027",
    customer: "Priya Sharma",
    amount: 599,
    method: "UPI",
    date: "Oct 7, 2026",
    status: "Success",
  },
  {
    id: "TXN-84019",
    order: "ORD-1026",
    customer: "Aman Verma",
    amount: 129,
    method: "Mastercard",
    date: "Oct 7, 2026",
    status: "Pending",
  },
];

// Review data
export const reviews = [
  {
    id: 1,
    customer: "Rahul Kumar",
    product: "iPhone 15 Pro",
    rating: 5,
    review: "Excellent camera and performance.",
    date: "Oct 8, 2026",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Priya Sharma",
    product: "Nike Air Max",
    rating: 4,
    review: "Comfortable and looks great.",
    date: "Oct 7, 2026",
    status: "Approved",
  },
];

// Notification data
export const notifications = [
  {
    id: 1,
    title: "New order received",
    text: "Order #ORD-1028",
    time: "2m ago",
    read: false,
    type: "order",
  },
  {
    id: 2,
    title: "Low stock alert",
    text: "Nike Air Max (3 left)",
    time: "15m ago",
    read: false,
    type: "stock",
  },
  {
    id: 3,
    title: "New review",
    text: "Rahul reviewed iPhone 15",
    time: "1h ago",
    read: false,
    type: "review",
  },
  {
    id: 4,
    title: "Payment received",
    text: "₹499 payment successful",
    time: "2h ago",
    read: true,
    type: "payment",
  },
];

// Revenue chart data
export const revenue = [
  { n: "Sep 8", v: 10 },
  { n: "Sep 12", v: 14 },
  { n: "Sep 16", v: 13 },
  { n: "Sep 20", v: 19 },
  { n: "Sep 24", v: 17 },
  { n: "Sep 28", v: 23 },
  { n: "Oct 2", v: 24 },
  { n: "Oct 6", v: 35 },
];

// Order chart data
export const orderBars = [
  { n: "Pending", v: 342 },
  { n: "Processing", v: 287 },
  { n: "Shipped", v: 198 },
  { n: "Delivered", v: 321 },
  { n: "Cancelled", v: 100 },
];

// Category sales data
export const categorySales = [
  {
    name: "Electronics",
    value: 32,
  },
  {
    name: "Fashion",
    value: 24,
  },
  {
    name: "Shoes",
    value: 16,
  },
  {
    name: "Beauty",
    value: 12,
  },
  {
    name: "Home",
    value: 10,
  },
  {
    name: "Others",
    value: 6,
  },
];