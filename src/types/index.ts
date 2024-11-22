export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
      name: string;
      url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface FilterOptions {
  status?: 'Alive' | 'Dead' | 'unknown';
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  page?: number;
}
