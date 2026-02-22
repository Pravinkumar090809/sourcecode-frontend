"use client";
export default function Loading() {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a0f",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, flexDirection: "column", gap: "1.5rem"
    }}>
      <div style={{
        width: 48, height: 48, border: "3px solid rgba(239,68,68,0.2)",
        borderTop: "3px solid #ef4444", borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <p style={{ color: "#94a3b8", fontSize: 14, letterSpacing: 2 }}>LOADING...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
