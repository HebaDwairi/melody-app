import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const baseUrl = '/api/melodies';

const useMelodiesService = () => {
  const { user } = useAuth();  // Now we're inside a function so useAuth works

  const create = async (melodyObj) => {
    try {
      const res = await axios.post(baseUrl, melodyObj, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,  // Ensure user is defined
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error creating melody:", error);
      throw error;
    }
  };

  return { create };
};

export default useMelodiesService;
