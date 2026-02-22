"use client";
import { useState, useEffect } from "react";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { HiOutlineMagnifyingGlass, HiOutlineFunnel, HiOutlineSquares2X2, HiOutlineListBullet } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [grid, setGrid] = useState(true);

  useEffect(() => {
    productAPI.getAll().then((res) => {
      const data = res.products || res.data || [];
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let r = [...products];
    if (search) r = r.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") r.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "high") r.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sort === "name") r.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    setFiltered(r);
  }, [search, sort, products]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
          <p className="text-slate-500">Browse our premium source code collection</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1">
            <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input-glass w-full pl-10" />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <HiOutlineFunnel className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-glass pl-9 pr-8 appearance-none cursor-pointer text-sm">
                <option value="newest">Newest</option>
                <option value="low">Price: Low</option>
                <option value="high">Price: High</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <button onClick={() => setGrid(true)} className={`p-2.5 transition-all ${grid ? "text-red-400 bg-red-500/10" : "text-slate-500 hover:text-white"}`}><HiOutlineSquares2X2 /></button>
              <button onClick={() => setGrid(false)} className={`p-2.5 transition-all ${!grid ? "text-red-400 bg-red-500/10" : "text-slate-500 hover:text-white"}`}><HiOutlineListBullet /></button>
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-slate-500">{filtered.length} products found</div>

        {loading ? (
          <div className={`grid ${grid ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-5`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44" style={{ background: "rgba(255,255,255,0.03)" }} />
                <div className="p-4 space-y-3">
                  <div className="h-4 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "70%" }} />
                  <div className="h-3 rounded" style={{ background: "rgba(255,255,255,0.03)" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={`grid ${grid ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-5`}>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="glass rounded-2xl p-16 text-center">
            <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Products Found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
