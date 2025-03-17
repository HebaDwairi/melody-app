import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useCallback } from 'react';

const baseUrl = '/api/melodies';

const useMelodiesService = () => {
  const { user } = useAuth();

  const create = useCallback(async (melodyObj) => {
    try {
      const res = await axios.post(baseUrl, melodyObj, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error creating melody:", error);
      throw error;
    }
  }, [user]);

  const getUserMelodies = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/user/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error getting user melodies:", error);
      console.log(user)
      throw error;
    }
  }, [user]);

  return { create, getUserMelodies};
};

export default useMelodiesService;
