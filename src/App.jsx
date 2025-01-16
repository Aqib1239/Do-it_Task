import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppContent from "./AppContent";

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
