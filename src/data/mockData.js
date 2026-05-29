// Mock data for Temi-Beautytech SaaS Dashboard

export const analyticsCards = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$124,592.50",
    change: "+14.2%",
    isPositive: true,
    timeframe: "vs last month",
    iconName: "DollarSign"
  },
  {
    id: "users",
    title: "Active Salons",
    value: "1,842",
    change: "+8.4%",
    isPositive: true,
    timeframe: "vs last week",
    iconName: "Users"
  },
  {
    id: "orders",
    title: "Bookings Processed",
    value: "18,294",
    change: "+22.1%",
    isPositive: true,
    timeframe: "vs last month",
    iconName: "Calendar"
  },
  {
    id: "growth",
    title: "API Success Rate",
    value: "99.98%",
    change: "-0.02%",
    isPositive: false,
    timeframe: "vs last month",
    iconName: "Activity"
  }
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 45000, bookings: 1200, apiCalls: 8500 },
  { month: "Feb", revenue: 52000, bookings: 1400, apiCalls: 9800 },
  { month: "Mar", revenue: 61000, bookings: 1750, apiCalls: 12000 },
  { month: "Apr", revenue: 58000, bookings: 1600, apiCalls: 11200 },
  { month: "May", revenue: 73000, bookings: 2100, apiCalls: 14500 },
  { month: "Jun", revenue: 85000, bookings: 2450, apiCalls: 17000 },
  { month: "Jul", revenue: 98000, bookings: 2900, apiCalls: 21000 },
  { month: "Aug", revenue: 95000, bookings: 2800, apiCalls: 19500 },
  { month: "Sep", revenue: 108000, bookings: 3200, apiCalls: 23000 },
  { month: "Oct", revenue: 115000, bookings: 3400, apiCalls: 25000 },
  { month: "Nov", revenue: 121000, bookings: 3650, apiCalls: 27200 },
  { month: "Dec", revenue: 124592, bookings: 3800, apiCalls: 29000 }
];

export const salesByCategory = [
  { name: "SaaS Subscriptions", value: 65, color: "#3B82F6" }, // Blue
  { name: "Skin Analysis API", value: 20, color: "#EC4899" }, // Pink
  { name: "Hardware Terminals", value: 10, color: "#10B981" }, // Green
  { name: "Premium Add-ons", value: 5, color: "#F59E0B" }  // Yellow
];

export const userSegmentation = [
  { name: "Hair Salons", value: 45 },
  { name: "Medi-Spas", value: 30 },
  { name: "Nail Bars", value: 15 },
  { name: "Independent Stylists", value: 10 }
];

export const recentTransactions = [
  {
    id: "TX-9021",
    client: "Glow & Co. Salon",
    email: "billing@glowandco.com",
    amount: "$299.00",
    status: "Success",
    date: "May 29, 2026",
    method: "Stripe",
    plan: "Pro Subscription"
  },
  {
    id: "TX-9020",
    client: "Aura MediSpa",
    email: "contact@auraspa.io",
    amount: "$1,250.00",
    status: "Success",
    date: "May 29, 2026",
    method: "Wire",
    plan: "Enterprise API + Skin Scanner"
  },
  {
    id: "TX-9019",
    client: "Belleza Hair Studio",
    email: "info@bellezadesign.com",
    amount: "$89.00",
    status: "Pending",
    date: "May 28, 2026",
    method: "Stripe",
    plan: "Starter Subscription"
  },
  {
    id: "TX-9018",
    client: "Nail Alchemy",
    email: "payments@nailalchemy.com",
    amount: "$299.00",
    status: "Success",
    date: "May 28, 2026",
    method: "PayPal",
    plan: "Pro Subscription"
  },
  {
    id: "TX-9017",
    client: "DermaCare Clinic",
    email: "dr.chen@dermacare.com",
    amount: "$500.00",
    status: "Failed",
    date: "May 27, 2026",
    method: "Stripe",
    plan: "Skin Analysis API Core"
  }
];

export const recentActivities = [
  {
    id: "act-1",
    user: "Sarah Jenkins",
    action: "upgraded to Pro Plan",
    target: "Glow & Co. Salon",
    time: "4 mins ago",
    type: "upgrade"
  },
  {
    id: "act-2",
    user: "System Admin",
    action: "deployed API patch",
    target: "v2.4.1 (Skin Diagnostics)",
    time: "25 mins ago",
    type: "system"
  },
  {
    id: "act-3",
    user: "Aura MediSpa",
    action: "integrated AI module",
    target: "Skin Scanner SDK",
    time: "2 hours ago",
    type: "integration"
  },
  {
    id: "act-4",
    user: "Marcus Vance",
    action: "requested payout",
    target: "$4,850.00",
    time: "5 hours ago",
    type: "payout"
  }
];
