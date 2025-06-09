import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type IconButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function IconButton({
  icon: Icon,
  label,
  onClick,
  className,
  type = "button",
}: IconButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition text-inherit",
        className
      )}
    >
      <Icon className="w-4 h-4 text-inherit" />
      <span className="text-inherit">{label}</span>
    </button>
  );
}
