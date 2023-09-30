import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  DashboardLayout,
  ErrorPage,
  AppLayout,
  Landing,
  Login,
  Register,
  AddProduct,
  Stats,
  AllProducts,
  Profile,
  Admin,
  UserProducts,
  EditProduct,
  DeleteProduct,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addProductAction } from './pages/AddProduct';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allProductsLoader } from './pages/AllProducts';
import { loader as userProductsLoader } from './pages/UserProducts';
import { loader as editProductLoader } from './pages/EditProduct';
import { action as editProductAction } from './pages/EditProduct';
import { action as deleteProductAction } from './pages/DeleteProduct';
import { loader as adminLoader } from './pages/Admin';
import { action as updateProfileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import { ErrorComponent } from './components';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddProduct />,
            action: addProductAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorComponent />,
          },
          {
            path: 'all-products',
            element: <AllProducts />,
            loader: allProductsLoader,
          },
          {
            path: 'user-products',
            element: <UserProducts />,
            loader: userProductsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: updateProfileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-product/:id',
            element: <EditProduct />,
            loader: editProductLoader,
            action: editProductAction,
          },
          {
            path: 'delete-product/:id',
            element: <DeleteProduct />,
            action: deleteProductAction,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;
