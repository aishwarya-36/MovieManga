import React, {useState } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import SearchInput from "../SearchInput";
import MovieGrid from "../MovieGrid";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  let refreshKey:number = 0;

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
          <MovieGrid key={refreshKey} searchTerm={searchTerm} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
