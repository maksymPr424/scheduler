import Link from "next/link";

interface headerProps {
  children?: React.ReactNode;
}

export default function Header({ children }: headerProps) {
  return (
    <header className="flex justify-between items-center mt-7">
      <Link
        className="text-base relative after:content-[''] after:absolute after:bottom-0.5 after:left-0 after:w-full after:h-0.25 after:bg-blue-400 hover:after:bg-blue-700 after:transition-transform"
        href="#"
      >
        Boosty
      </Link>
      {children}
    </header>
  );
}
