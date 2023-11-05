import React, { FC, useEffect, useRef, useState } from "react";
import { FiltersContainer } from "./home.styles";
import { IFilters } from "../../models";
import { debounce } from "../../utilities";
import { usePatientsStore } from "../../stores";

const Filters: FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const usePatients = usePatientsStore();
  const [filters, setFilters] = useState<IFilters>({
    age: usePatients.filters.age ?? "-1",
    gender: usePatients.filters.gender ?? "All",
    query: usePatients.filters.query ?? "",
    isInitial: true,
  });

  const handleFilterChange = (value: string, key: keyof IFilters) => {
    setFilters((prev) => ({ ...prev, isInitial: false, [key]: value }));
  };

  useEffect(() => {
    usePatients.setFilters(filters);
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      age: "-1",
      gender: "All",
      query: "",
      isInitial: false,
    });

    searchInputRef.current!.value = "";

    usePatients.reload();
  };

  const handleQueryChangeDebounced = debounce(() => {
    if (searchInputRef.current) {
      const query = searchInputRef.current.value;
      handleFilterChange(query, "query");
    }
  }, 500);

  return (
    <FiltersContainer data-testid="filters-container">
      <div>
        <p>Search with ID, Name, Email</p>
        <input
          data-testid="filter-query"
          ref={searchInputRef}
          defaultValue={filters.query}
          type="search"
          onChange={handleQueryChangeDebounced}
        />
      </div>
      <div>
        <p>Gender:</p>
        <select
          data-testid="filter-gender"
          value={filters.gender}
          onChange={(e) => {
            handleFilterChange(e.target.value, "gender");
          }}
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <p>Age:</p>
        <select
          data-testid="filter-age"
          value={filters.age}
          onChange={(e) => {
            handleFilterChange(e.target.value, "age");
          }}
        >
          <option value="-1">All</option>
          <option value="18-30">18 - 30</option>
          <option value="31-45">31 - 45</option>
          <option value=">45"> {`>`} 45</option>
        </select>
      </div>

      <button onClick={handleClearFilters}>Clear filters</button>
    </FiltersContainer>
  );
};

export default Filters;
