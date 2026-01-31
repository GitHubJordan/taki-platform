import React from "react";

const spinnerStyle: React.CSSProperties = {
  display: "inline-block",
  width: "64px",
  height: "64px",
  border: "8px solid #f3f3f3",
  borderTop: "8px solid #3498db",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

export default function LoadingSpinner() {
  return (
    <div style={wrapperStyle}>
      <div style={spinnerStyle} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}