"use client";
import { useState, useRef } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { adminAPI } from "@/lib/api";
import { HiOutlineCloudArrowUp, HiOutlineCheckCircle, HiOutlineDocumentText } from "react-icons/hi2";

export default function AdminUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const fileRef = useRef(null);
  const key = Cookies.get("admin_api_key");

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    const res = await adminAPI.uploadFile(key, formData);
    setUploading(false);
    if (res.success) {
      const url = res.url || res.data?.url || res.file_url || "";
      setUploadedUrl(url);
      toast.success("File uploaded successfully!");
    } else toast.error(res.message || "Upload failed");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <HiOutlineCloudArrowUp className="text-red-400" /> Upload Files
        </h1>
        <p className="text-slate-500 text-sm">Upload source code files to storage</p>
      </div>

      <div className="glass rounded-2xl p-6 animate-fadeIn">
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-red-500/30 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".zip,.rar,.7z,.tar.gz,.pdf,.txt" />
          <HiOutlineCloudArrowUp className="text-4xl text-slate-500 mx-auto mb-3" />
          {file ? (
            <div>
              <p className="text-sm text-white font-medium flex items-center justify-center gap-2"><HiOutlineDocumentText className="text-red-400" />{file.name}</p>
              <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-400">Click to select a file</p>
              <p className="text-xs text-slate-600 mt-1">ZIP, RAR, 7Z, PDF, TXT (max 50MB)</p>
            </div>
          )}
        </div>

        {file && (
          <button onClick={handleUpload} disabled={uploading} className="btn-primary w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-50 mt-4 flex items-center justify-center gap-2">
            {uploading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</> : <><HiOutlineCloudArrowUp /> Upload File</>}
          </button>
        )}

        {uploadedUrl && (
          <div className="mt-4 p-4 rounded-xl animate-fadeIn" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineCheckCircle className="text-green-400" />
              <p className="text-sm font-medium text-green-400">Upload Successful!</p>
            </div>
            <div className="flex items-center gap-2">
              <input readOnly value={uploadedUrl} className="input-glass flex-1 text-xs" />
              <button onClick={() => { navigator.clipboard.writeText(uploadedUrl); toast.success("Copied!"); }} className="btn-secondary px-3 py-2 rounded-lg text-xs">Copy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
