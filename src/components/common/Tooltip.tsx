interface TooltipProps {
  children: React.ReactNode;
  tip: string;
}

export default function Tooltip({ children, tip }: TooltipProps) {
  return (
    <span className="relative group/tip inline cursor-help">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max max-w-[200px] rounded bg-gray-950 border border-gray-700 px-2 py-1 text-xs text-gray-100 shadow-lg opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-50 text-center leading-snug normal-case font-normal whitespace-normal">
        {tip}
      </span>
    </span>
  );
}
