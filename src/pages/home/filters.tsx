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
    sort: usePatients.filters.sort ?? "",
    isInitial: true,
  });

  const handleFilterChange = (value: string, key: keyof IFilters) => {
    setFilters((prev) => ({ ...prev, isInitial: false, [key]: value }));
  };

  const handleSortChange = (value: string, key: "field" | "order") => {
    setFilters((prev) => ({
      ...prev,
      isInitial: false,
      sort: { ...prev.sort, [key]: value },
    }));
  };

  useEffect(() => {
    usePatients.setFilters(filters);
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      age: "-1",
      gender: "All",
      query: "",
      sort: {
        field: "patient_id",
        order: "asc",
      },
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

      <div>
        <p>Sort:</p>
        <select
          data-testid="sort-field"
          value={filters.sort.field}
          onChange={(e) => {
            handleSortChange(e.target.value, "field");
          }}
        >
          <option value="patient_id">Patient Id</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="email">Email</option>
          <option value="age">Age</option>
        </select>
        <select
          data-testid="sort-direction"
          value={filters.sort.order}
          onChange={(e) => {
            handleSortChange(e.target.value, "order");
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <button onClick={handleClearFilters}>Clear filters</button>
    </FiltersContainer>
  );
};

export default Filters;
