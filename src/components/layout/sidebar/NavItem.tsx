import { useBreakpoint } from "@/hook/useBreakpoint";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type NavItemProps = {
  icon: React.ReactNode;
  title: string;
};

export default function NavItem({ icon, title }: NavItemProps) {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const isActive = active === title;
  const breakpoint = useBreakpoint();

  const navItemClasses = `flex items-center gap-4 w-fit h-[43px] p-3 rounded-full cursor-pointer ${
    isActive ? "bg-tertiary" : "hover:bg-tertiary/[.5]"
  }`;

  if (title === "Sair" || title === "Criar participante") {
    return (
      <div className={navItemClasses}>
        {icon}
        {breakpoint !== "mobile" && <span>{title}</span>}
      </div>
    );
  }

  return (
    <Link href={`/?active=${title}`} className={navItemClasses}>
      {icon}
      <span>{title}</span>
    </Link>
  );
}
