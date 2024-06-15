export default function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,
          alignContent: "center",
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