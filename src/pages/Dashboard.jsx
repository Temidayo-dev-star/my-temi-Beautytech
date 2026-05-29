import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  analyticsCards,
  monthlyRevenue,
  salesByCategory,
  userSegmentation,
  recentTransactions,
  recentActivities
} from "../data/mockData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  DollarSign,
  Users,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Search,
  Plus,
  SlidersHorizontal,
  Download,
  AlertCircle
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import toast from "react-hot-toast";

// Icon mapping dictionary
const iconMap = {
  DollarSign: DollarSign,
  Users: Users,
  Calendar: Calendar,
  Activity: Activity
};

export default function Dashboard() {
  const location = useLocation();
  const activePath = location.pathname;

  // Search & Filter state for Users/Salons view
  const [userSearch, setUserSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");

  // State to simulate downloading reports
  const [downloading, setDownloading] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Exporting analytical report to PDF...",
        success: "Report downloaded successfully!",
        error: "Export failed."
      }
    ).finally(() => setDownloading(false));
  };

  // Filtered transactions for the /users route
  const filteredTransactions = useMemo(() => {
    return recentTransactions.filter((tx) => {
      const matchesSearch =
        tx.client.toLowerCase().includes(userSearch.toLowerCase()) ||
        tx.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        tx.id.toLowerCase().includes(userSearch.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      
      const matchesTier =
        tierFilter === "All" ||
        tx.plan.toLowerCase().includes(tierFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesTier;
    });
  }, [userSearch, statusFilter, tierFilter]);

  // Actions for salon management
  const handleSalonAction = (actionName, clientName) => {
    toast.success(`${actionName} action performed for ${clientName}`);
  };

  /* ========================================================
     1. OVERVIEW VIEW (Path: "/")
     ======================================================== */
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card) => {
          const IconComponent = iconMap[card.iconName] || Activity;
          return (
            <Card key={card.id} hoverable className="relative overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {card.title}
                  </span>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 group-hover:text-blue-500 transition-colors">
                    <IconComponent size={20} />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-2xl font-bold tracking-tight">{card.value}</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className={`text-xs font-semibold flex items-center gap-0.5 ${
                        card.isPositive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {card.change}
                    </span>
                    <span className="text-xs text-neutral-400">{card.timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart - Revenue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Insights</CardTitle>
                <CardDescription>Visualizing revenue growth & salon API requests</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full font-semibold">
                <TrendingUp size={14} />
                <span>+12.4% MoM</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" name="Revenue ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Channels</CardTitle>
            <CardDescription>Product and subscription breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex flex-col justify-center">
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Color Legends */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {salesByCategory.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 truncate">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-neutral-500 dark:text-neutral-400 truncate">{entry.name}</span>
                  <span className="font-semibold">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables & Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions Mini List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Partnerships</CardTitle>
              <CardDescription>Latest subscriptions & integrations processed</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-800 text-neutral-400 font-medium">
                  <th className="pb-3 font-semibold">Salon / Partner</th>
                  <th className="pb-3 font-semibold">Plan</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
                {recentTransactions.slice(0, 4).map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                    <td className="py-3">
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{tx.client}</p>
                      <p className="text-xs text-neutral-400">{tx.email}</p>
                    </td>
                    <td className="py-3 text-neutral-500 dark:text-neutral-400 text-xs">{tx.plan}</td>
                    <td className="py-3 font-semibold">{tx.amount}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          tx.status === "Success"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : tx.status === "Pending"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Real-time system diagnostics & actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-neutral-200 dark:border-neutral-800 pl-4 space-y-6">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative group">
                  {/* Circle marker */}
                  <span className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500 dark:border-neutral-900 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-neutral-400">{act.time}</p>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {act.user} <span className="font-normal text-neutral-500 dark:text-neutral-400">{act.action}</span>
                  </p>
                  <p className="text-xs bg-neutral-50 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400 px-2 py-1 rounded inline-block mt-1 font-mono">
                    {act.target}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  /* ========================================================
     2. ANALYTICS VIEW (Path: "/analytics")
     ======================================================== */
  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Performance Deep Dive</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Detailed overview of core usage telemetry metrics</p>
        </div>
        <Button onClick={handleDownloadReport} className="cursor-pointer" isLoading={downloading}>
          <Download size={16} className="mr-2" /> Export PDF
        </Button>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings & Conversions Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Volume & Processing Trends</CardTitle>
            <CardDescription>Number of salon bookings successfully handled monthly</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Bar dataKey="bookings" name="Bookings Handled" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Segmentations */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Segments</CardTitle>
            <CardDescription>Beautytech subscriber distribution by type</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex flex-col justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userSegmentation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#10B981" />
                    <Cell fill="#F59E0B" />
                    <Cell fill="#8B5CF6" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Telemetry API calls */}
      <Card>
        <CardHeader>
          <CardTitle>API Diagnostic Performance</CardTitle>
          <CardDescription>Aggregated API calls to skin diagnostic scanner API endpoints</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-800" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="apiCalls" stroke="#10B981" fill="#10B981" fillOpacity={0.06} name="AI API Calls" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  /* ========================================================
     3. PARTNERS / USERS VIEW (Path: "/users")
     ======================================================== */
  const renderUsers = () => (
    <div className="space-y-6">
      {/* Filtering Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Partner Operations Directory</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage and monitor integrated beauty salon nodes</p>
        </div>
        <Button onClick={() => handleSalonAction("Register New Partner", "system")} className="cursor-pointer">
          <Plus size={16} className="mr-2" /> Add Salon Partner
        </Button>
      </div>

      {/* Filter and Search Controls */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
          {/* Search box */}
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by salon name, email, or invoice transaction ID..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:bg-neutral-900 text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="text-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Plans</option>
              <option value="Starter">Starter Plan</option>
              <option value="Pro">Pro Plan</option>
              <option value="Enterprise">Enterprise Plan</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-neutral-500 dark:text-neutral-400 font-semibold">
                <th className="p-4">Salon Node</th>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Tier / Setup</th>
                <th className="p-4">Billing Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-100">{tx.client}</p>
                      <p className="text-xs text-neutral-400">{tx.email}</p>
                    </td>
                    <td className="p-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">{tx.id}</td>
                    <td className="p-4 text-neutral-500 dark:text-neutral-400">{tx.method}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                        {tx.plan}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-500 dark:text-neutral-400">{tx.date}</td>
                    <td className="p-4 font-semibold text-neutral-800 dark:text-neutral-100">{tx.amount}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          tx.status === "Success"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : tx.status === "Pending"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSalonAction("Edit Salon Metadata", tx.client)}
                        >
                          Configure
                        </Button>
                        {tx.status === "Failed" && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleSalonAction("Retry billing transaction", tx.client)}
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-neutral-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={28} className="text-neutral-300" />
                      <p className="text-sm font-medium">No partners match the selected filter query.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // Render view based on route path
  if (activePath === "/analytics") return renderAnalytics();
  if (activePath === "/users") return renderUsers();
  return renderOverview();
}
