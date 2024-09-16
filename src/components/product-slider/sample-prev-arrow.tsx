export function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#B0B0B0", // Cinza claro
        borderRadius: "50%",
        height: "42px",
        width: "42px",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <i className="arrow-icon" style={{ color: "#FFF", fontSize: "20px" }}></i>
    </div>
  );
}
