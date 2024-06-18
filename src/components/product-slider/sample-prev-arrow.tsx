export default function SamplePrevArrow(props:any) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "#000052",
          borderRadius: '50%',
          height: '40px',
          width: '40px',
          zIndex: 1000
        }}
        onClick={onClick}
      />
    );
}