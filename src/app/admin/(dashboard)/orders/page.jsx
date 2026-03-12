"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import { orderAPI } from "@/lib/api";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineArrowDownTray,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowPath,
  HiOutlineXMark,
  HiOutlineEye,
  HiOutlineBanknotes,
  HiOutlineShoppingCart,
  HiOutlineExclamationTriangle,
  HiOutlineCheckBadge,
  HiOutlineCalendarDays,
  HiOutlineArrowsUpDown,
  HiOutlineChevronDown,
  HiOutlineTrash,
  HiOutlineEnvelope,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";
import { FiPackage, FiCheck, FiX } from "react-icons/fi";

// Constants
const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export default function AdminOrdersPage() {
  // State
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  const key = Cookies.get("admin_api_key");

  // Fetch orders
  const fetchOrders = useCallback(async (showRefresh = false) => {
    if (!key) return;
    if (showRefresh) setRefreshing(true);
    
    try {
      const res = await orderAPI.adminAll(key);
      if (res.success) {
        setOrders(res.orders || res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [key]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const paidOrders = orders.filter(o => (o.payment_status||"").toLowerCase() === "paid");
    const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);
    const todayPaidOrders = todayOrders.filter(o => (o.payment_status||"").toLowerCase() === "paid");

    return {
      total: orders.length,
      totalRevenue: paidOrders.reduce((sum, o) => sum + (o.amount || o.price || 0), 0),
      paidOrders: paidOrders.length,
      pendingOrders: orders.filter(o => (o.payment_status||"").toLowerCase() !== "paid").length,
      todayOrders: todayOrders.length,
      todayRevenue: todayPaidOrders.reduce((sum, o) => sum + (o.amount || o.price || 0), 0),
    };
  }, [orders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(o =>
        o.id?.toLowerCase().includes(query) ||
        o.email?.toLowerCase().includes(query) ||
        o.product_title?.toLowerCase().includes(query) ||
        o.customer_name?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(o => (o.payment_status||"").toLowerCase() === statusFilter);
    }

    // Date filter
    const now = new Date();
    if (dateFilter !== "all") {
      result = result.filter(o => {
        const orderDate = new Date(o.created_at);
        switch (dateFilter) {
          case "today":
            return orderDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return orderDate >= monthAgo;
          case "year":
            return orderDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "amount-high":
          return (b.amount || b.price || 0) - (a.amount || a.price || 0);
        case "amount-low":
          return (a.amount || a.price || 0) - (b.amount || b.price || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [orders, searchQuery, statusFilter, dateFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, sortBy, itemsPerPage]);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedOrders.size === paginatedOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(paginatedOrders.map(o => o.id)));
    }
  };

  const toggleSelectOrder = (id) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrders(newSelected);
  };

  // Export functions
  const exportToCSV = () => {
    const headers = ["Order ID", "Product", "Email", "Amount", "Status", "Date"];
    const data = filteredOrders.map(o => [
      o.id,
      o.product_title || "",
      o.email || "",
      o.amount || o.price || 0,
      (o.payment_status || "pending").toLowerCase(),
      new Date(o.created_at).toLocaleDateString(),
    ]);
    
    const csv = [headers, ...data].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    setShowExportMenu(false);
  };

  const exportToJSON = () => {
    const json = JSON.stringify(filteredOrders, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    setShowExportMenu(false);
  };

  // Copy order ID
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!key) return;
    setUpdatingStatus(orderId);
    
    try {
      // API call to update status
      // await orderAPI.updateStatus(key, orderId, newStatus);
      
      // Optimistic update
      setOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, payment_status: newStatus } : o
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HiOutlineClipboardDocumentList className="text-red-400" /> 
            All Orders
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage and track all customer orders
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="btn-secondary text-xs sm:text-sm"
          >
            <HiOutlineArrowPath className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="btn-secondary text-xs sm:text-sm"
            >
              <HiOutlineArrowDownTray />
              <span className="hidden sm:inline">Export</span>
              <HiOutlineChevronDown className="text-xs" />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-40 glass rounded-xl overflow-hidden z-50 animate-fadeIn">
                <button
                  onClick={exportToCSV}
                  className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <HiOutlineDocumentDuplicate className="text-green-400" />
                  Export CSV
                </button>
                <button
                  onClick={exportToJSON}
                  className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <HiOutlineDocumentDuplicate className="text-blue-400" />
                  Export JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fadeIn" style={{ animationDelay: "50ms" }}>
        <StatCard
          icon={<HiOutlineShoppingCart className="text-blue-400" />}
          label="Total Orders"
          value={stats.total}
          subValue={`${stats.todayOrders} today`}
          color="blue"
        />
        <StatCard
          icon={<HiOutlineBanknotes className="text-green-400" />}
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          subValue={`₹${stats.todayRevenue.toLocaleString()} today`}
          color="green"
        />
        <StatCard
          icon={<HiOutlineCheckBadge className="text-emerald-400" />}
          label="Paid Orders"
          value={stats.paidOrders}
          subValue={`${((stats.paidOrders / stats.total) * 100 || 0).toFixed(1)}%`}
          color="emerald"
        />
        <StatCard
          icon={<HiOutlineExclamationTriangle className="text-amber-400" />}
          label="Pending"
          value={stats.pendingOrders}
          subValue={`${((stats.pendingOrders / stats.total) * 100 || 0).toFixed(1)}%`}
          color="amber"
        />
      </div>

      {/* Search & Filters */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 space-y-4 animate-fadeIn" style={{ animationDelay: "100ms" }}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders by ID, email, product..."
              className="input-glass pl-10 w-full text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <HiOutlineXMark />
              </button>
            )}
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary text-sm ${showFilters ? "bg-red-500/20 text-red-400" : ""}`}
          >
            <HiOutlineFunnel />
            Filters
            {(statusFilter !== "all" || dateFilter !== "all") && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 animate-fadeIn">
            {/* Status Filter */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Payment Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-glass w-full text-sm"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            {/* Date Filter */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="input-glass w-full text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-glass w-full text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(searchQuery || statusFilter !== "all" || dateFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-500">Active filters:</span>
            {searchQuery && (
              <FilterBadge
                label={`Search: ${searchQuery}`}
                onRemove={() => setSearchQuery("")}
              />
            )}
            {statusFilter !== "all" && (
              <FilterBadge
                label={`Status: ${statusFilter}`}
                onRemove={() => setStatusFilter("all")}
              />
            )}
            {dateFilter !== "all" && (
              <FilterBadge
                label={`Date: ${dateFilter}`}
                onRemove={() => setDateFilter("all")}
              />
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDateFilter("all");
              }}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm animate-fadeIn" style={{ animationDelay: "150ms" }}>
        <p className="text-slate-500">
          Showing <span className="text-white">{paginatedOrders.length}</span> of{" "}
          <span className="text-white">{filteredOrders.length}</span> orders
        </p>
        
        {selectedOrders.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">{selectedOrders.size} selected</span>
            <button
              onClick={() => setSelectedOrders(new Set())}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>

      {/* Orders Table/Cards */}
      {loading ? (
        <LoadingSkeleton />
      ) : paginatedOrders.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <div className="overflow-x-auto">
              <table className="table-glass">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input
                        type="checkbox"
                        checked={selectedOrders.size === paginatedOrders.length && paginatedOrders.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500 focus:ring-red-500/20"
                      />
                    </th>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order, i) => (
                    <tr 
                      key={order.id} 
                      className={`animate-fadeIn ${selectedOrders.has(order.id) ? "bg-red-500/5" : ""}`}
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.has(order.id)}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs">{order.id?.slice(0, 8)}...</span>
                          <button
                            onClick={() => copyToClipboard(order.id)}
                            className="text-slate-500 hover:text-white transition-colors"
                          >
                            <HiOutlineDocumentDuplicate className="text-xs" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <FiPackage className="text-red-400 text-sm" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-white truncate max-w-[200px]">{order.product_title || "—"}</p>
                            {order.quantity && order.quantity > 1 && (
                              <p className="text-xs text-slate-500">Qty: {order.quantity}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="min-w-0">
                          <p className="text-sm text-white truncate max-w-[150px]">{order.customer_name || "Customer"}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[150px]">{order.email || "—"}</p>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-white">₹{(order.amount || order.price || 0).toLocaleString()}</span>
                      </td>
                      <td>
                        <StatusBadge status={order.payment_status || "pending"} />
                      </td>
                      <td>
                        <div>
                          <p className="text-sm text-white">{new Date(order.created_at).toLocaleDateString()}</p>
                          <p className="text-xs text-slate-500">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowOrderModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                            title="View details"
                          >
                            <HiOutlineEye className="text-lg" />
                          </button>
                          <button
                            onClick={() => window.location.href = `mailto:${order.email}`}
                            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                            title="Email customer"
                          >
                            <HiOutlineEnvelope className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-3 animate-fadeIn" style={{ animationDelay: "200ms" }}>
            {paginatedOrders.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                index={i}
                isSelected={selectedOrders.has(order.id)}
                onToggleSelect={() => toggleSelectOrder(order.id)}
                onView={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
                onCopy={() => copyToClipboard(order.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="glass rounded-xl sm:rounded-2xl p-4 animate-fadeIn" style={{ animationDelay: "250ms" }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Items per page */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="input-glass py-1.5 px-2 text-sm w-20"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <span className="text-slate-500">per page</span>
              </div>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <HiOutlineChevronLeft />
                </button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, i) => (
                    typeof page === "number" ? (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-red-500 text-white"
                            : "hover:bg-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={i} className="px-2 text-slate-500">...</span>
                    )
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <HiOutlineChevronRight />
                </button>
              </div>

              {/* Page info */}
              <p className="text-sm text-slate-500">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </>
      ) : (
        <EmptyState searchQuery={searchQuery} />
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }}
          onUpdateStatus={(status) => updateOrderStatus(selectedOrder.id, status)}
          updatingStatus={updatingStatus === selectedOrder.id}
        />
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, subValue, color }) {
  return (
    <div className="glass rounded-xl p-4 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`text-xs text-${color}-400`}>{subValue}</p>
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const config = {
    paid: { color: "green", icon: <HiOutlineCheckCircle /> },
    pending: { color: "amber", icon: <HiOutlineClock /> },
    failed: { color: "red", icon: <HiOutlineXMark /> },
    refunded: { color: "purple", icon: <HiOutlineArrowPath /> },
  };
  
  const { color, icon } = config[status] || config.pending;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-${color}-400 bg-${color}-500/10`}>
      {icon} {status}
    </span>
  );
}

// Filter Badge Component
function FilterBadge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-xs text-slate-400">
      {label}
      <button onClick={onRemove} className="hover:text-white">
        <HiOutlineXMark className="text-xs" />
      </button>
    </span>
  );
}

// Order Card Component (Mobile)
function OrderCard({ order, index, isSelected, onToggleSelect, onView, onCopy }) {
  return (
    <div 
      className={`glass rounded-xl p-4 animate-fadeIn ${isSelected ? "ring-1 ring-red-500/50 bg-red-500/5" : ""}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500 focus:ring-red-500/20"
        />
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                <FiPackage className="text-red-400 text-sm" />
              </div>
              <span className="text-sm text-white font-medium truncate">{order.product_title || "—"}</span>
            </div>
            <span className="font-bold text-white whitespace-nowrap">₹{(order.amount || order.price || 0).toLocaleString()}</span>
          </div>
          
          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 truncate max-w-[60%]">{order.email || "—"}</span>
              <StatusBadge status={order.payment_status || "pending"} />
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="font-mono">{order.id?.slice(0, 8)}...</span>
                <button onClick={onCopy} className="hover:text-white transition-colors">
                  <HiOutlineDocumentDuplicate />
                </button>
              </div>
              <span>{new Date(order.created_at).toLocaleDateString()} • {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
            <button
              onClick={onView}
              className="flex-1 btn-secondary text-xs py-2"
            >
              <HiOutlineEye /> View Details
            </button>
            <button
              onClick={() => window.location.href = `mailto:${order.email}`}
              className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            >
              <HiOutlineEnvelope />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-slate-700 rounded" />
            <div className="w-8 h-8 bg-slate-700 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-1/3" />
              <div className="h-3 bg-slate-700/50 rounded w-1/4" />
            </div>
            <div className="h-6 bg-slate-700 rounded-full w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty State
function EmptyState({ searchQuery }) {
  return (
    <div className="glass rounded-xl sm:rounded-2xl p-10 sm:p-16 text-center animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
        {searchQuery ? (
          <HiOutlineMagnifyingGlass className="text-3xl text-slate-600" />
        ) : (
          <HiOutlineClipboardDocumentList className="text-3xl text-slate-600" />
        )}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
        {searchQuery ? "No Orders Found" : "No Orders Yet"}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
        {searchQuery 
          ? "Try adjusting your search or filters to find what you're looking for"
          : "Orders will appear here when customers purchase products"
        }
      </p>
    </div>
  );
}

// Order Detail Modal
function OrderDetailModal({ order, onClose, onUpdateStatus, updatingStatus }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto animate-fadeIn">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl p-4 sm:p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Order Details</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <HiOutlineXMark className="text-xl" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Product */}
          <div className="glass-light rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <FiPackage className="text-red-400 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{order.product_title || "—"}</h3>
                <p className="text-sm text-slate-500">Product ID: {order.product_id?.slice(0, 8) || "—"}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">₹{(order.amount || order.price || 0).toLocaleString()}</p>
                {order.quantity && <p className="text-xs text-slate-500">Qty: {order.quantity}</p>}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Customer Information</h4>
            <div className="space-y-2">
              <DetailRow label="Name" value={order.customer_name || "Customer"} />
              <DetailRow label="Email" value={order.email || "—"} copyable />
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Payment Information</h4>
            <div className="space-y-2">
              <DetailRow label="Status">
                <StatusBadge status={order.payment_status || "pending"} />
              </DetailRow>
              <DetailRow label="Method" value={order.payment_method || "—"} />
              {order.transaction_id && (
                <DetailRow label="Transaction ID" value={order.transaction_id} copyable />
              )}
            </div>
          </div>

          {/* Dates */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Timeline</h4>
            <div className="space-y-2">
              <DetailRow 
                label="Created" 
                value={new Date(order.created_at).toLocaleString()} 
              />
              {order.delivered_at && (
                <DetailRow 
                  label="Delivered" 
                  value={new Date(order.delivered_at).toLocaleString()} 
                />
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
            {order.payment_status !== "paid" && (
              <button
                onClick={() => onUpdateStatus("paid")}
                disabled={updatingStatus}
                className="btn-primary flex-1 text-sm"
              >
                {updatingStatus ? (
                  <HiOutlineArrowPath className="animate-spin" />
                ) : (
                  <HiOutlineCheckCircle />
                )}
                Mark as Paid
              </button>
            )}
            <button
              onClick={() => window.location.href = `mailto:${order.email}`}
              className="btn-secondary flex-1 text-sm"
            >
              <HiOutlineEnvelope /> Email Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Detail Row Component
function DetailRow({ label, value, children, copyable }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]">
      <span className="text-sm text-slate-500">{label}</span>
      {children || (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">{value}</span>
          {copyable && value && (
            <button
              onClick={() => navigator.clipboard.writeText(value)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <HiOutlineDocumentDuplicate className="text-sm" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}