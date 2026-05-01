import AnimatedRoutes from "./components/animatedRoutes/AnimatedRoutes";

/**
 * @description Main App component that defines the routing for the application
 * @returns {JSX.Element} Main App component with routing
 */
function App() {
  return (
    <div data-theme="dark" className="relative min-h-full w-full">
      <div className="fixed inset-0 -z-10 h-full w-full bg-base-300" />
      <div className="relative z-0 min-h-full w-full">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default App;
