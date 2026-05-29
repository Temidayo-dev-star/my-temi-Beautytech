

export function Card({
  children,
  className = "",
  hoverable = false,
  glass = false,
  ...props
}) {
  return (
    <div
      className={`
        rounded-xl border border-neutral-200/80 dark:border-neutral-800/80
        ${glass 
          ? "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md" 
          : "bg-white dark:bg-neutral-900"
        }
        text-neutral-900 dark:text-neutral-100
        transition-all duration-300 ease-in-out
        ${hoverable 
          ? "hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-300 dark:hover:border-neutral-700" 
          : "shadow-sm"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`p-6 pb-3 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight leading-none text-neutral-800 dark:text-neutral-100 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "", ...props }) {
  return (
    <p
      className={`text-sm text-neutral-500 dark:text-neutral-400 mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 pt-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={`p-6 pt-3 flex items-center border-t border-neutral-100 dark:border-neutral-800/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
