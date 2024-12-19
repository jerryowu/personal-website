export default function ClickableBlock({ title }: { title: string }) {
  return (
    <div
      className="cursor-pointer rounded-lg bg-[#ebdbb2] p-6 m-4 hover:shadow-xl transition-all duration-200 border-2 border-[#98971a] hover:bg-[#fbf1c7]"
      style={{
        width: "250px",
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="text-center font-bold text-[#3c3836] text-xl">
        {title}
      </div>
    </div>
  );
}
