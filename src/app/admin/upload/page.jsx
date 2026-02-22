"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import {
  HiCloudUpload,
  HiX,
  HiDocumentText,
  HiCheckCircle,
} from "react-icons/hi";

export default function AdminUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) validateAndSet(dropped);
  };

  const validateAndSet = (f) => {
    if (!f.name.endsWith(".zip")) {
      toast.error("Only ZIP files allowed");
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      toast.error("Max file size is 50MB");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file");
    setUploading(true);
    try {
      const res = await adminAPI.uploadFile(file, ADMIN_API_KEY);
      if (res.success) {
        setResult(res.data);
        toast.success("Uploaded!");
        setFile(null);
      } else {
        toast.error(res.message || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">
          Upload <span className="gradient-text">Source Code</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload ZIP files for your products
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`glass rounded-2xl sm:rounded-3xl p-10 sm:p-16 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
          dragOver
            ? "border-orange-500 bg-orange-500/5"
            : "border-white/30 hover:border-orange-500/40"
        }`}
      >
        <HiCloudUpload
          className={`text-4xl sm:text-5xl mx-auto mb-4 transition-colors ${
            dragOver ? "text-orange-500" : "text-slate-300"
          }`}
        />
        <p className="text-sm sm:text-base font-semibold text-slate-700">
          {dragOver ? "Drop your file here" : "Drag & drop ZIP file or click to browse"}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          ZIP files only • Max 50MB
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) validateAndSet(f);
          }}
        />
      </div>

      {/* Selected file */}
      {file && (
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="icon-box icon-box-orange w-10 h-10 shrink-0">
            <HiDocumentText className="text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {file.name}
            </p>
            <p className="text-xs text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={() => setFile(null)}
            className="p-2 rounded-xl hover:bg-white/50 text-slate-400"
          >
            <HiX />
          </button>
        </div>
      )}

      {/* Upload button */}
      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="btn-primary w-full justify-center"
        >
          {uploading ? "Uploading..." : "Upload File"}
          <HiCloudUpload />
        </button>
      )}

      {/* Result */}
      {result && (
        <div className="glass rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <HiCheckCircle className="text-lg" />
            <span className="font-semibold text-sm">Upload Successful!</span>
          </div>
          <div className="p-3 rounded-xl bg-white/40">
            <p className="text-xs text-slate-400 mb-1">File URL</p>
            <p className="text-sm text-slate-700 break-all font-mono">
              {result.url || result.file_url || JSON.stringify(result)}
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Copy this URL when creating a product.
          </p>
        </div>
      )}
    </div>
  );
}
