export default function ClickableBlock({ title }: { title: string }) {
  return (
    <div
      className="border-4 border-[#6c4a1e] cursor-pointer rounded-lg bg-[#8b6b42] p-4 m-4 hover:shadow-lg transition-shadow relative"
      style={{
        width: "250px",
        height: "250px",
        backgroundImage: "radial-gradient(#8b6b42 2px, transparent 2px)",
        backgroundSize: "10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="absolute top-2 left-2 text-2xl">🌿</div>
      <div className="absolute top-2 right-2 text-2xl">🌱</div>
      <div className="absolute bottom-2 left-2 text-2xl">🍀</div>
      <div className="absolute bottom-2 right-2 text-2xl">🌿</div>
      <div className="text-center font-bold text-[#f5e6d3] text-xl">
        {title}
      </div>
    </div>
  );
}
