import { AxiosError } from 'axios';
import StyledAllProducts from '../assets/wrappers/AllProductsPage';
import { UserProductsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { IAxiosResponse } from '../types/Products';
import { UserProductsProvider } from '../context/UserProductsContext';
import { AllProductsProvider } from '../context/AllProductsContext';
('react-router-dom');

export const loader = async () => {
  try {
    const { data }: IAxiosResponse = await customFetch(
      '/products/userProducts'
    );
    return { data };
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    return error;
  }
};

const UserProducts = () => {
  return (
    <StyledAllProducts>
      <AllProductsProvider>
        <SearchContainer page="user-products" />
      </AllProductsProvider>
      <UserProductsProvider>
        <UserProductsContainer />
      </UserProductsProvider>
    </StyledAllProducts>
  );
};

export default UserProducts;
