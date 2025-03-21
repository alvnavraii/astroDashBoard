import type { Language } from "../i18n";
import CatalanFlag from "./CatalanFlag";

interface FlagIconProps {
  language: Language;
  className?: string;
}

export default function FlagIcon({ language, className = "w-6 h-6" }: FlagIconProps) {
  switch (language) {
    case "ca":
      return <CatalanFlag className={className} />;
    case "en":
      return <span className="text-xl">🇬🇧</span>;
    case "es":
      return <span className="text-xl">🇪🇸</span>;
    case "fr":
      return <span className="text-xl">🇫🇷</span>;
    case "de":
      return <span className="text-xl">🇩🇪</span>;
    default:
      return null;
  }
} 