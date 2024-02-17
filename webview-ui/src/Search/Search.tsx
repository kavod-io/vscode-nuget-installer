import { ChangeEventHandler } from "react";

type SearchProps = {
  includePrerelease: boolean;
  updateIncludePrerelease: (newValue: boolean) => void;

  searchText: string;
  updateSearchText: (newValue: string) => void;
};

const Search = ({
  includePrerelease,
  updateIncludePrerelease,
  searchText,
  updateSearchText,
}: SearchProps) => {
  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateSearchText(e.target.value);
  };

  const handlePrereleaseChange: ChangeEventHandler<HTMLInputElement> = () => {
    updateIncludePrerelease(!includePrerelease);
  };

  return (
    <div>
      <input type="text" value={searchText} onChange={handleTextChange} />
      <input type="checkbox" checked={includePrerelease} onChange={handlePrereleaseChange} />
    </div>
  );
};

export { Search };
