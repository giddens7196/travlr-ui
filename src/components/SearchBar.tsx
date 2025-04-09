// file: src/components/SearchBar.tsx
interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
}

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Search trips by title, tags, etc."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8, fontSize: 16 }}
      />
    </div>
  );
}
