"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import { adminAPI } from "@/lib/api";
import {
  HiOutlineUsers,
  HiOutlineEnvelope,
  HiOutlineCalendar,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineArrowDownTray,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineArrowPath,
  HiOutlineXMark,
  HiOutlineEye,
  HiOutlineUserPlus,
  HiOutlineShoppingBag,
  HiOutlineChevronDown,
  HiOutlineDocumentDuplicate,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineClock,
} from "react-icons/hi2";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export default function AdminBuyersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const key = Cookies.get("admin_api_key");

  const fetchUsers = useCallback(async (showRefresh = false) => {
    if (!key) return;
    if (showRefresh) setRefreshing(true);
    try {
      const res = await adminAPI.getUsers(key);
      if (res.success) setUsers(res.users || res.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [key]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // Statistics
  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const todayUsers = users.filter(u => new Date(u.created_at).toDateString() === today);
    const weekUsers = users.filter(u => new Date(u.created_at) >= weekAgo);
    const totalSpent = users.reduce((sum, u) => sum + (u.total_spent || 0), 0);
    const activeUsers = users.filter(u => u.orders_count && u.orders_count > 0);

    return {
      total: users.length,
      today: todayUsers.length,
      thisWeek: weekUsers.length,
      totalSpent,
      activeUsers: activeUsers.length,
      avgOrderValue: activeUsers.length ? totalSpent / activeUsers.length : 0,
    };
  }, [users]);

  // Filtered & Sorted Users
  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.id?.toLowerCase().includes(q)
      );
    }

    const now = new Date();
    if (dateFilter !== "all") {
      result = result.filter(u => {
        const date = new Date(u.created_at);
        switch (dateFilter) {
          case "today": return date.toDateString() === now.toDateString();
          case "week": return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          case "month": return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          default: return true;
        }
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "name": return (a.name || "").localeCompare(b.name || "");
        case "orders": return (b.orders_count || 0) - (a.orders_count || 0);
        case "spent": return (b.total_spent || 0) - (a.total_spent || 0);
        default: return 0;
      }
    });

    return result;
  }, [users, searchQuery, dateFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, dateFilter, sortBy, itemsPerPage]);

  // Selection
  const toggleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(paginatedUsers.map(u => u.id)));
    }
  };

  const toggleSelect = (id) => {
    const newSet = new Set(selectedUsers);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedUsers(newSet);
  };

  // Export
  const exportData = (format) => {
    const data = filteredUsers.map(u => ({
      id: u.id,
      name: u.name || "",
      email: u.email,
      registered: new Date(u.created_at).toLocaleDateString(),
      orders: u.orders_count || 0,
      spent: u.total_spent || 0,
    }));

    let content, type, ext;
    if (format === "csv") {
      const headers = ["ID", "Name", "Email", "Registered", "Orders", "Total Spent"];
      content = [headers, ...data.map(d => Object.values(d))].map(r => r.join(",")).join("\n");
      type = "text/csv";
      ext = "csv";
    } else {
      content = JSON.stringify(data, null, 2);
      type = "application/json";
      ext = "json";
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().split("T")[0]}.${ext}`;
    a.click();
    setShowExportMenu(false);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const getInitials = (name, email) => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  const getAvatarColor = (str) => {
    const colors = [
      "from-red-500 to-rose-600",
      "from-blue-500 to-indigo-600",
      "from-green-500 to-emerald-600",
      "from-purple-500 to-violet-600",
      "from-amber-500 to-orange-600",
      "from-pink-500 to-fuchsia-600",
      "from-cyan-500 to-teal-600",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fadeIn">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <HiOutlineUsers className="text-red-400" /> Registered Buyers
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">Manage your customer base</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchUsers(true)} disabled={refreshing} className="btn-secondary text-xs sm:text-sm">
            <HiOutlineArrowPath className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <div className="relative">
            <button onClick={() => setShowExportMenu(!showExportMenu)} className="btn-secondary text-xs sm:text-sm">
              <HiOutlineArrowDownTray />
              <span className="hidden sm:inline">Export</span>
              <HiOutlineChevronDown className="text-xs" />
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-36 glass rounded-xl overflow-hidden z-50 animate-fadeIn">
                <button onClick={() => exportData("csv")} className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2">
                  <HiOutlineDocumentDuplicate className="text-green-400" /> CSV
                </button>
                <button onClick={() => exportData("json")} className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 flex items-center gap-2">
                  <HiOutlineDocumentDuplicate className="text-blue-400" /> JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fadeIn" style={{ animationDelay: "50ms" }}>
        <StatCard icon={<HiOutlineUsers className="text-blue-400" />} label="Total Users" value={stats.total} sub={`+${stats.today} today`} />
        <StatCard icon={<HiOutlineUserPlus className="text-green-400" />} label="This Week" value={stats.thisWeek} sub={`${((stats.thisWeek / stats.total) * 100 || 0).toFixed(0)}% growth`} />
        <StatCard icon={<HiOutlineShoppingBag className="text-purple-400" />} label="Active Buyers" value={stats.activeUsers} sub={`${((stats.activeUsers / stats.total) * 100 || 0).toFixed(0)}%`} />
        <StatCard icon={<HiOutlineShoppingBag className="text-amber-400" />} label="Total Spent" value={`₹${stats.totalSpent.toLocaleString()}`} sub="All time" />
      </div>

      {/* Search & Filters */}
      <div className="glass rounded-xl sm:rounded-2xl p-4 space-y-4 animate-fadeIn" style={{ animationDelay: "100ms" }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or ID..."
              className="input-glass pl-10 w-full text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <HiOutlineXMark />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`btn-secondary text-sm ${showFilters ? "bg-red-500/20 text-red-400" : ""}`}>
            <HiOutlineFunnel /> Filters
            {dateFilter !== "all" && <span className="w-2 h-2 bg-red-500 rounded-full" />}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5 animate-fadeIn">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Registered</label>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="input-glass w-full text-sm">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-glass w-full text-sm">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="orders">Most Orders</option>
                <option value="spent">Highest Spent</option>
              </select>
            </div>
          </div>
        )}

        {(searchQuery || dateFilter !== "all") && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-500">Active:</span>
            {searchQuery && <FilterBadge label={`"${searchQuery}"`} onRemove={() => setSearchQuery("")} />}
            {dateFilter !== "all" && <FilterBadge label={dateFilter} onRemove={() => setDateFilter("all")} />}
            <button onClick={() => { setSearchQuery(""); setDateFilter("all"); }} className="text-xs text-red-400 hover:text-red-300">Clear all</button>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm animate-fadeIn" style={{ animationDelay: "150ms" }}>
        <p className="text-slate-500">
          Showing <span className="text-white">{paginatedUsers.length}</span> of <span className="text-white">{filteredUsers.length}</span> users
        </p>
        {selectedUsers.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">{selectedUsers.size} selected</span>
            <button onClick={() => setSelectedUsers(new Set())} className="text-red-400 hover:text-red-300 text-xs">Clear</button>
          </div>
        )}
      </div>

      {/* Users List */}
      {loading ? (
        <LoadingSkeleton />
      ) : paginatedUsers.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block glass rounded-xl sm:rounded-2xl overflow-hidden animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <table className="table-glass">
              <thead>
                <tr>
                  <th className="w-10">
                    <input type="checkbox" checked={selectedUsers.size === paginatedUsers.length && paginatedUsers.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500 focus:ring-red-500/20" />
                  </th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Registered</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, i) => (
                  <tr key={user.id} className={`animate-fadeIn ${selectedUsers.has(user.id) ? "bg-red-500/5" : ""}`} style={{ animationDelay: `${i * 30}ms` }}>
                    <td>
                      <input type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => toggleSelect(user.id)} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500 focus:ring-red-500/20" />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarColor(user.email)} flex items-center justify-center text-white font-bold text-sm`}>
                          {getInitials(user.name, user.email)}
                        </div>
                        <span className="font-medium text-white">{user.name || "User"}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 text-sm truncate max-w-[200px]">{user.email}</span>
                        <button onClick={() => navigator.clipboard.writeText(user.email)} className="text-slate-600 hover:text-white">
                          <HiOutlineDocumentDuplicate className="text-xs" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-sm text-white">{new Date(user.created_at).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-500">{new Date(user.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`text-sm ${user.orders_count ? "text-white" : "text-slate-500"}`}>
                        {user.orders_count || 0}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium text-white">₹{(user.total_spent || 0).toLocaleString()}</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setSelectedUser(user); setShowUserModal(true); }} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="View">
                          <HiOutlineEye className="text-lg" />
                        </button>
                        <button onClick={() => window.location.href = `mailto:${user.email}`} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors" title="Email">
                          <HiOutlineEnvelope className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3 animate-fadeIn" style={{ animationDelay: "200ms" }}>
            {paginatedUsers.map((user, i) => (
              <UserCard
                key={user.id}
                user={user}
                index={i}
                isSelected={selectedUsers.has(user.id)}
                onToggle={() => toggleSelect(user.id)}
                onView={() => { setSelectedUser(user); setShowUserModal(true); }}
                getInitials={getInitials}
                getAvatarColor={getAvatarColor}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="glass rounded-xl sm:rounded-2xl p-4 animate-fadeIn" style={{ animationDelay: "250ms" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">Show</span>
                  <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="input-glass py-1.5 px-2 text-sm w-20">
                    {ITEMS_PER_PAGE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="text-slate-500">per page</span>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <HiOutlineChevronLeft />
                  </button>
                  {getPageNumbers().map((page, i) =>
                    typeof page === "number" ? (
                      <button key={i} onClick={() => setCurrentPage(page)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? "bg-red-500 text-white" : "hover:bg-white/5 text-slate-400"}`}>
                        {page}
                      </button>
                    ) : (
                      <span key={i} className="px-2 text-slate-500">...</span>
                    )
                  )}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    <HiOutlineChevronRight />
                  </button>
                </div>

                <p className="text-sm text-slate-500">Page {currentPage} of {totalPages}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState searchQuery={searchQuery} />
      )}

      {/* User Modal */}
      {showUserModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => { setShowUserModal(false); setSelectedUser(null); }} getInitials={getInitials} getAvatarColor={getAvatarColor} />
      )}
    </div>
  );
}

// Components
function StatCard({ icon, label, value, sub }) {
  return (
    <div className="glass rounded-xl p-4 hover:bg-white/[0.02] transition-colors">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">{icon}</div>
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-xs text-green-400">{sub}</p>
      </div>
    </div>
  );
}

function FilterBadge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-xs text-slate-400">
      {label}
      <button onClick={onRemove} className="hover:text-white"><HiOutlineXMark className="text-xs" /></button>
    </span>
  );
}

function UserCard({ user, index, isSelected, onToggle, onView, getInitials, getAvatarColor }) {
  return (
    <div className={`glass rounded-xl p-4 animate-fadeIn ${isSelected ? "ring-1 ring-red-500/50 bg-red-500/5" : ""}`} style={{ animationDelay: `${index * 40}ms` }}>
      <div className="flex items-start gap-3">
        <input type="checkbox" checked={isSelected} onChange={onToggle} className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-red-500" />
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getAvatarColor(user.email)} flex items-center justify-center text-white font-bold flex-shrink-0`}>
          {getInitials(user.name, user.email)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium text-white truncate">{user.name || "User"}</p>
            <span className="text-xs text-slate-500">{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="text-slate-400"><span className="text-white font-medium">{user.orders_count || 0}</span> orders</span>
            <span className="text-slate-400">₹<span className="text-white font-medium">{(user.total_spent || 0).toLocaleString()}</span> spent</span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
            <button onClick={onView} className="flex-1 btn-secondary text-xs py-2"><HiOutlineEye /> View</button>
            <button onClick={() => window.location.href = `mailto:${user.email}`} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
              <HiOutlineEnvelope />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-slate-700 rounded" />
            <div className="w-10 h-10 bg-slate-700 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-1/4" />
              <div className="h-3 bg-slate-700/50 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ searchQuery }) {
  return (
    <div className="glass rounded-xl sm:rounded-2xl p-10 sm:p-16 text-center animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
        {searchQuery ? <HiOutlineMagnifyingGlass className="text-3xl text-slate-600" /> : <HiOutlineUsers className="text-3xl text-slate-600" />}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{searchQuery ? "No Users Found" : "No Users Yet"}</h3>
      <p className="text-xs sm:text-sm text-slate-500">{searchQuery ? "Try adjusting your search" : "Users will appear here when they register"}</p>
    </div>
  );
}

function UserModal({ user, onClose, getInitials, getAvatarColor }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass rounded-2xl w-full max-w-md animate-fadeIn">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">User Details</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"><HiOutlineXMark className="text-xl" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getAvatarColor(user.email)} flex items-center justify-center text-white font-bold text-2xl`}>
              {getInitials(user.name, user.email)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user.name || "User"}</h3>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-light rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">{user.orders_count || 0}</p>
              <p className="text-xs text-slate-500">Orders</p>
            </div>
            <div className="glass-light rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">₹{(user.total_spent || 0).toLocaleString()}</p>
              <p className="text-xs text-slate-500">Total Spent</p>
            </div>
          </div>

          <div className="space-y-2">
            <DetailRow label="User ID" value={user.id} />
            <DetailRow label="Registered" value={new Date(user.created_at).toLocaleString()} />
            {user.last_order && <DetailRow label="Last Order" value={new Date(user.last_order).toLocaleDateString()} />}
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button onClick={() => window.location.href = `mailto:${user.email}`} className="flex-1 btn-primary text-sm">
              <HiOutlineEnvelope /> Email User
            </button>
            <button className="flex-1 btn-secondary text-sm">
              <HiOutlineShoppingBag /> View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm text-white font-mono">{value}</span>
    </div>
  );
}