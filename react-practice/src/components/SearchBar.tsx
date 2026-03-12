import { useEffect, useState } from "react";

const list = ["Apple", "Banana", "Grapes", "Orange", "Pineapple"];

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredList = list.filter((item) =>
    item.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <>
      <div>
        <input type="search" value={search} onChange={handleOnChange} />
        {filteredList?.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
        {filteredList.length === 0 && <p>No item found</p>}
      </div>
    </>
  );
};
