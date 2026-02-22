"use client";

import { useEffect, useState } from "react";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { HiSearch, HiCode, HiAdjustments } from "react-icons/hi";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"latest" | "price-low" | "price-high">("latest");

  useEffect(() => {
    productAPI.getAll().then((res) => {
      if (res.success) {
        setProducts(res.data || []);
        setFiltered(res.data || []);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }

    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFiltered(result);
  }, [search, products, sort]);

  return (
    <div className="px-4 py-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-sm text-slate-400">Browse premium source code packages</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-glass !pl-11"
              placeholder="Search products..."
            />
          </div>
          <div className="relative">
            <HiAdjustments className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="input-glass !pl-11 !pr-4 cursor-pointer min-w-[180px] appearance-none"
            >
              <option value="latest">Latest First</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="glass p-16 text-center animate-fade-in-scale">
            <div className="icon-box icon-box-orange mx-auto mb-4 w-16 h-16">
              <HiCode className="text-orange-500 text-2xl" />
            </div>
            <p className="text-slate-500 font-medium">{search ? "No products match your search" : "No products available"}</p>
            <p className="text-xs text-slate-400 mt-1">{search ? "Try a different keyword" : "Check back soon!"}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-5 font-medium">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${0.06 * i}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
