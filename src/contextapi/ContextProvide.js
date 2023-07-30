import { useEffect, createContext, useState } from "react";
import { PropTypes } from "prop-types";
export const ContentContext = createContext("");

export default function ContextProvide({ children }) {
  const [todoContents, setTodoContents] = useState(() => {
    const storedData = localStorage.getItem("todoData");
    return storedData
      ? //converting json file back from string to orignal format
        JSON.parse(storedData)
      : [
          {
            id: 1,
            title: "check",
            date: "check",
            description: "check",
            category: "check",
            important: false,
            completed: false,
          },
        ];
  });

  useEffect(() => {
    //converts todoContents to string representation, localStorage stores only strings
    localStorage.setItem("todoData", JSON.stringify(todoContents));
  }, [todoContents]);

  const [addTodoDialog, setAddTodoDialog] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  return (
    <ContentContext.Provider
      value={{
        todoContents,
        setTodoContents,
        addTodoDialog,
        setAddTodoDialog,
        filter,
        setFilter,
        search,
        setSearch,
        drawer,
        setDrawer,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

ContextProvide.propTypes = {
  children: PropTypes.node.isRequired,
};
