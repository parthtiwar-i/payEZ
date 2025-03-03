"use client";
export const Select = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <select
    id="bank"
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="block w-full py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
    >
      {options.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};
