import React from "react";

const Mykeyboard = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
      <div style={{ flexShrink: 0 }} onClick={() => document.activeElement?.blur()}>
        {/* This creates a touchable area at the bottom of the screen that will dismiss the keyboard */}
      </div>
    </div>
  );
};

export default Mykeyboard;
