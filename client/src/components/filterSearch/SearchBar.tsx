import { useEffect, useState } from "react";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchKey, setSearchKey] = useState("");
    const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

    // Update debouncedSearchKey after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchKey(searchKey);
        }, 800); // 800ms debounce time

        // Clear timer if searchKey changes before 800ms
        return () => clearTimeout(timer);
    }, [searchKey]);

    // Trigger search when debouncedSearchKey changes
    useEffect(() => {
        onSearch(debouncedSearchKey);
    }, [debouncedSearchKey, onSearch]);

    return (
        <input
            type="text"
            placeholder="Search"
            className="px-4 mx-11 py-2 border border-gray-300 rounded-md"
            onChange={(e) => setSearchKey(e.target.value.trim())}
        />
    );
};

export default SearchBar;
