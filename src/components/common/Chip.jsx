export default function Chip({ children }) {
    return (
      <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium text-gray-800 dark:text-gray-100 border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/10">
        {children}
      </span>
    );
  }
