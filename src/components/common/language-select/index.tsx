"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "vi", name: "Vietnamese" },
];

interface LanguageSelectorProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function LanguageSelector({
  defaultValue = "en",
  onValueChange,
  className,
}: LanguageSelectorProps) {
  const selectedLanguage = languages.find((lang) => lang.code === defaultValue);

  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Language">
          <div className="flex items-center gap-2">
            <span>{selectedLanguage?.name || defaultValue.toUpperCase()}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
