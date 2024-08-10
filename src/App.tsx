import Room from "./pages/room.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Toaster} from "sonner";
import {queryClient} from "./lib/react-query.ts";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Room />,
        },
    ]);
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster invert richColors />
        </QueryClientProvider>
  );
}

export default App
