import { useEffect } from "react";

const Modal = ({ children, onClose, title = "Default modal" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick} style={backdrop}>
      <div style={modalStyles}>
        <>
          <h1>{title}</h1>
          <hr />
        </>
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

const backdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "500px",
  maxWidth: "100%",
  color: "black",
};
