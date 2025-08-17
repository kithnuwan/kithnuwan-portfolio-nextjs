export default function Chip({ children }) {
    return (
      <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur">
        {children}
      </span>
    );
  }
