import "./App.css";
import { CharacterCount } from "./components/CharacterCount";
import { OtpInput } from "./components/OtpFocus.tsx/OtpFocus";
import { PasswordChecker } from "./components/PasswordChecker/PasswordChecker";
import { SearchBar } from "./components/SearchBar";
import { SelectableList } from "./components/SelectableList";
import { SmartCounter } from "./components/SmartCounter/SmartCounter";
import { Tabs } from "./components/Tabs/Tabs";
import { TodoApp } from "./components/TodoApp/TodoApp";
import { Toggle } from "./components/Toggle";

function App() {
  return (
    <>
      {/* <Toggle /> */}
      {/* <CharacterCount /> */}
      {/* <SearchBar /> */}
      {/* <SelectableList /> */}
      {/* <Tabs /> */}
      {/* <PasswordChecker /> */}
      {/* <OtpInput len={8} /> */}
      {/* <SmartCounter /> */}
      <TodoApp />
    </>
  );
}

export default App;
