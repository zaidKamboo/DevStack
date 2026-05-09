
import AllRoutes from "./pages/AllRoutes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={ {
          style: {
            background: "#0f172a",
            color: "#22c55e",
            border: "1px solid #22c55e",
          },
        } }
      />

      {/* Routes */ }
      <AllRoutes />
    </>
  );
};

export default App;