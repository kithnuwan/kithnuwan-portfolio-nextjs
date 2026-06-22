export default function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-[#00BFFF] border border-[rgba(0,191,255,0.25)] bg-[rgba(0,191,255,0.08)]">
      {children}
    </span>
  );
}
