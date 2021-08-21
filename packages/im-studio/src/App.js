import { BrowserRouter as Router } from "react-router-dom";

// Components
import { ErrorBoundary } from "@sentry/react";
import AppLoader from "@im/components/src/molecules/appLoader";
import { ToastContainer } from "@im/components/src/atoms/toaster";

// Routes
import Routes from "./routes";

// Antd Styles
import "antd/dist/antd.css";

// Styles
import "./App.css";

// sentry test purpose only, will be replaced by 404 page
function FallbackComponent() {
  return <div>An error has occurred</div>;
}

const myFallback = <FallbackComponent />;

function App() {
  return (
    <Router>
      <ErrorBoundary fallback={myFallback} showDialog>
        <AppLoader />
        <Routes />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
