interface OptionsSelectedTypes {
  name: string;
  img: string;
}

interface SelectProps {
  id: string;
  platformSelected: string;
  onChange: (newValue: string) => void;
}

export type { SelectProps, OptionsSelectedTypes };
