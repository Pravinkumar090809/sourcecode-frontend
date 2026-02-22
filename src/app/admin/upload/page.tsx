"use client";

import { useEffect, useState, useRef } from "react";
import { adminAPI } from "@/lib/api";
import { ADMIN_API_KEY } from "@/lib/store";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { HiCloudUpload, HiDocumentText, HiTrash, HiRefresh } from "react-icons/hi";

interface FileItem {
  name: string;
  id?: string;
  metadata?: { size: number; mimetype: string };
  created_at?: string;
}

export default function AdminUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const res = await adminAPI.listFiles(ADMIN_API_KEY);
    if (res.success) setFiles(res.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleUpload = async (file: File) => {
    if (!file.name.endsWith(".zip")) {
      toast.error("Only ZIP files are allowed");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File must be under 50 MB");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await adminAPI.uploadFile(ADMIN_API_KEY, formData);
    if (res.success) {
      toast.success("File uploaded successfully!");
      fetchFiles();
    } else {
      toast.error(res.error || "Upload failed");
    }
    setUploading(false);
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}" permanently?`)) return;
    const res = await adminAPI.deleteFile(ADMIN_API_KEY, name);
    if (res.success) {
      toast.success("File deleted");
      fetchFiles();
    } else toast.error(res.error || "Delete failed");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleUpload(e.dataTransfer.files[0]);
  };

  if (loading) return <Loading />;

  return (
    <div className="pb-20 lg:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Upload <span className="gradient-text">Files</span></h1>
          <p className="text-xs text-slate-400 mt-1">{files.length} files in storage</p>
        </div>
        <button onClick={fetchFiles} className="icon-box icon-box-blue w-10 h-10 cursor-pointer hover:scale-110 transition">
          <HiRefresh className="text-blue-500" />
        </button>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`glass p-10 text-center cursor-pointer border-2 border-dashed transition-all duration-300 mb-8 rounded-2xl ${
          dragOver ? "border-orange-400 bg-orange-50/60 scale-[1.01]" : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/30"
        }`}
      >
        <input ref={inputRef} type="file" accept=".zip" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
            <p className="text-sm font-bold text-orange-500">Uploading...</p>
          </div>
        ) : (
          <>
            <div className="icon-box icon-box-orange mx-auto mb-4 w-16 h-16">
              <HiCloudUpload className="text-orange-500 text-2xl" />
            </div>
            <p className="font-bold text-slate-700">Drop ZIP file here or <span className="text-orange-500 underline">browse</span></p>
            <p className="text-xs text-slate-400 mt-1">Only .zip files, max 50 MB</p>
          </>
        )}
      </div>

      {/* Files List */}
      {files.length === 0 ? (
        <div className="glass p-10 text-center animate-fade-in-scale">
          <div className="icon-box icon-box-purple mx-auto mb-4 w-16 h-16">
            <HiDocumentText className="text-purple-500 text-2xl" />
          </div>
          <p className="text-slate-500 font-medium">No files uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={f.name} className="glass p-4 flex items-center justify-between gap-3 animate-fade-in-up" style={{ animationDelay: `${0.04 * i}s` }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="icon-box icon-box-green w-10 h-10 shrink-0">
                  <HiDocumentText className="text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-700 truncate">{f.name}</p>
                  {f.metadata?.size && (
                    <p className="text-[10px] text-slate-400">{(f.metadata.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>
              </div>
              <button onClick={() => handleDelete(f.name)} className="icon-box w-9 h-9 bg-red-50 hover:bg-red-100 cursor-pointer transition shrink-0">
                <HiTrash className="text-red-500 text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
