import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AllIdeas from "./pages/AllIdeas";
import CategoryPage from "./pages/CategoryPage";
import Quests from "./pages/Quests";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Movies from "./pages/Movies";
import AdultPage from "./pages/AdultPage";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "ideas", element: <AllIdeas /> },
      { path: "ideas/all", element: <AllIdeas /> },
      { path: "category/adult", element: <AdultPage /> },
      { path: "category/:id", element: <CategoryPage /> },
      { path: "quests", element: <Quests /> },
      { path: "movies", element: <Movies /> },
      { path: "progress", element: <Progress /> },
      { path: "favorites", element: <Favorites /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);