import { forwardRef } from "react";

type SearchInputProps = {
  search: string | null;
  filterSearch: (x: string) => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ search, filterSearch }, inputRef) => {
    const handleChange = (value: string) => {
      filterSearch(value);
    };

    return (
      <div className="flex w-full">
        <input
          ref={inputRef}
          className="w-full"
          placeholder="Add new user"
          value={search || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    );
  }
);
