"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { productAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { FiPackage } from "react-icons/fi";

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = slug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    productAPI.getAll().then((res) => {
      const all = res.products || res.data || [];
      setProducts(all);
      setLoading(false);
    });
  }, [slug]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-400 transition-colors mb-6">
          <HiOutlineArrowLeft /> All Categories
        </Link>
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-500">{products.length} products in this category</p>
        </div>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="glass rounded-2xl h-64 animate-pulse" />)}
          </div>
        ) : products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="glass rounded-2xl p-16 text-center">
            <FiPackage className="text-5xl text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Products Yet</h3>
            <p className="text-sm text-slate-500">Products in this category are coming soon</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
