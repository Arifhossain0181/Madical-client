import { useQuery } from '@tanstack/react-query'
import Axios from '../Hook/Axios'

const Usecart = () => {
  const axiossecure = Axios();

  const { data: cart = [], isLoading, refetch } = useQuery({
    queryKey: ['cart'],  // ✅ K বড় হাতের
    queryFn: async () => {  // ✅ F বড় হাতের
      const res = await axiossecure.get('/mycart');
      return res.data;
    },
  });

  return [cart, isLoading, refetch]; // refetch আর loading ও কাজে লাগবে
};

export default Usecart;
