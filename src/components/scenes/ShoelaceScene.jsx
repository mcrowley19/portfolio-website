import shoelaceImg from "../../assets/projects/shoelace.png";

export default function ShoelaceScene({ onReady }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      <img
        src={shoelaceImg}
        alt="shoelace"
        className="w-[70%] max-w-[500px] object-contain animate-[float_4s_ease-in-out_infinite]"
        onLoad={() => onReady?.()}
      />
    </div>
  );
}
