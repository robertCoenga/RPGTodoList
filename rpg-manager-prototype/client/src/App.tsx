import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DayDetail from "./pages/DayDetail";
import Projects from "./pages/Projects";
import Vault from "./pages/Vault";
import Analytics from "./pages/Analytics";
import Dungeon from "./pages/Dungeon";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/day/:id"} component={DayDetail} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/vault"} component={Vault} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/dungeon"} component={Dungeon} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
