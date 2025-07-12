import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import useDebounce from "../hooks/useDebounce";
import SearchInput from "../SearchInput";
import MovieGrid from "../MovieGrid";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    // Initialize searchTerm with URL parameter on first render
    return searchParams.get("search") || "";
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  let refreshKey: number = 0;

  // Update URL when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ search: debouncedSearchTerm });
      sessionStorage.setItem('lastSearchTerm', debouncedSearchTerm);
    } else {
      setSearchParams({});
      sessionStorage.removeItem('lastSearchTerm');
    }
  }, [debouncedSearchTerm, setSearchParams]);

  const onSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="px-4 py-8 w-[90%] mx-auto">
        <div className="flex">
          <SearchInput value={searchTerm} onChange={onSearchInputChange} />
        </div>
        <div className="mt-10">
          <MovieGrid key={refreshKey} searchTerm={debouncedSearchTerm} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;