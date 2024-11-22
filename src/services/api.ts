import axios from 'axios';
import { ApiResponse, FilterOptions } from '@/types';

export class RickAndMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  async getCharacters(filters: FilterOptions = {}): Promise<ApiResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      
      if (filters.gender) {
        queryParams.append('gender', filters.gender);
      }
      
      if (filters.page) {
        queryParams.append('page', filters.page.toString());
      }

      const query = queryParams.toString();
      const url = `${this.baseUrl}/character${query ? `?${query}` : ''}`;
      
      const response = await axios.get<ApiResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }
}
