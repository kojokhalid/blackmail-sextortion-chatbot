import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Chat from "./pages/Chat";
import MainLayout from "./layouts/MainLayout";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<Chat></Chat>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
