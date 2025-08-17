export default function Card({ children }) {
    return (
      <div className="rounded-2xl bg-white/80 dark:bg-white/5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6 h-full">
        {children}
      </div>
    );
  }