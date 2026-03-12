import { useState } from "react";
import "./style.css";

const tabs = [
  { id: 1, title: "Home", content: "Welcome to the home page" },
  { id: 2, title: "About", content: "This is the about section" },
  { id: 3, title: "Contact", content: "Contact us here" },
];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {tabs.map((item) => (
          <div key={item.id}>
            <button
              className={activeTab === item.id ? "active" : "inactive"}
              onClick={() => setActiveTab(item.id)}
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p>{activeContent?.content}</p>
      </div>
    </div>
  );
};
