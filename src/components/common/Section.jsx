export default function Section({ id, title, eyebrow, children, actions }) {
    return (
      <section id={id} className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          {eyebrow && (
            <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">{eyebrow}</div>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {actions && <div className="mb-8">{actions}</div>}
        {children}
      </section>
    );
  }
