"use client";
import { useState, useEffect } from "react";
import { RickAndMortyService } from "@/services/api";
import { CharacterCard } from "@/components/CharacterCard";
import { Character, FilterOptions } from "@/types";

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const service = new RickAndMortyService();

  useEffect(() => {
    fetchCharacters();
  }, [filters, currentPage]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await service.getCharacters({
        ...filters,
        page: currentPage,
      });
      setCharacters(response.results);
      setTotalPages(response.info.pages);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
    setLoading(false);
  };

  const handleFilterChange = (
    filterType: keyof FilterOptions,
    value: string | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value || undefined,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="mb-8 flex gap-4">
        <select
          className="p-2 border rounded-md"
          onChange={(e) => handleFilterChange("status", e.target.value)}
          value={filters.status || ""}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          className="p-2 border rounded-md"
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          value={filters.gender || ""}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
