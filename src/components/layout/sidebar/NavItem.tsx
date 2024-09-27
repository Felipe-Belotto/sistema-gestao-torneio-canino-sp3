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

  if (title === "Sair" || title === "Criar participante") {
    return (
      <div
        className={`flex items-center gap-4 w-[238px] h-[43px] pl-3 rounded-full cursor-pointer ${
          isActive ? "bg-tertiary" : "hover:bg-tertiary/[.5]"
        }`}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  }

  return (
    <Link
      href={`?active=${title}`}
      className={`flex items-center gap-4 w-[200px] h-[43px] pl-3 rounded-full  ${
        isActive ? "bg-tertiary" : "hover:bg-tertiary/[.5]"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
