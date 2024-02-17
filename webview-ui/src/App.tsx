import { Search } from "./Search";
import { PackageList } from "./PackageList";
import { ProjectList } from "./ProjectList";
import { PackageMetadata } from "./PackageMetadata";

import "./App.css";

function App() {
  return (
    <main>
      <Search />
      <PackageList />
      <ProjectList />
      <PackageMetadata />
    </main>
  );
}

export default App;
