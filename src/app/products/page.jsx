"use client";

import { useEffect, useState, useMemo } from "react";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { HiSearch, HiCube, HiSortDescending } from "react-icons/hi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    productAPI
      .getAll()
      .then((res) => setProducts(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return list;
  }, [products, search, sort]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 py-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          All <span className="gradient-text">Products</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse our premium source code collection
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col xs:flex-row gap-3">
        <div className="relative flex-1">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="input-glass pl-11"
          />
        </div>
        <div className="relative">
          <HiSortDescending className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-glass pl-11 pr-8 appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="glass rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          <p className="text-xs text-slate-400">{filtered.length} products found</p>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <HiCube className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            {search ? "No products match your search" : "No products available"}
          </p>
        </div>
      )}
    </div>
  );
}
