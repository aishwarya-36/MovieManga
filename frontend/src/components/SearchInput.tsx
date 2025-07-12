import type { SearchInputProps } from "../types/type";

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const handleChange = (e:any) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full mx-4">
      <input
        type="text"
        placeholder="Search for your favourite movies..."
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-[#f8f4ff] dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
