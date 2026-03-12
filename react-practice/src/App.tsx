import "./App.css";
import { CharacterCount } from "./components/CharacterCount";
import { Counter } from "./components/Counter";
import { OtpInput } from "./components/OtpFocus.tsx/OtpFocus";
import { PasswordChecker } from "./components/PasswordChecker/PasswordChecker";
import { SearchBar } from "./components/SearchBar";
import { SelectableList } from "./components/SelectableList";
import { Tabs } from "./components/Tabs/Tabs";
import { Toggle } from "./components/Toggle";

function App() {
  return (
    <>
      {/* <Counter /> */}
      {/* <Toggle /> */}
      {/* <CharacterCount /> */}
      {/* <SearchBar /> */}
      {/* <SelectableList /> */}
      {/* <Tabs /> */}
      {/* <PasswordChecker /> */}
      <OtpInput len={8} />
    </>
  );
}

export default App;
