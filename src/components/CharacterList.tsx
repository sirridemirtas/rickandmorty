"use client";
import { useState, useEffect } from "react";
import { RickAndMortyService } from "@/services/api";
import { CharacterCard } from "@/components/CharacterCard";
import { Character, FilterOptions } from "@/types";
import { Check } from "lucide-react";

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

  const renderFilterButton = (
    filterType: keyof FilterOptions,
    value: string,
    label: string
  ) => {
    const isSelected = filters[filterType] === value;
    return (
      <button
        className={`px-4 py-2 border rounded-full flex items-center gap-2 ${
          isSelected ? "bg-black text-white" : "bg-white text-black"
        }`}
        onClick={() =>
          handleFilterChange(filterType, isSelected ? undefined : value)
        }
      >
        {isSelected && <Check className="w-4 h-4" />}
        {label}
      </button>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Sticky Filters */}
      <div className="sticky top-0 bg-neutral-100 z-10 py-4 mb-8 overflow-x-auto">
        <div className="flex gap-4 justify-center">
          {renderFilterButton("status", "Alive", "Alive")}
          {renderFilterButton("status", "Dead", "Dead")}
          {renderFilterButton("status", "unknown", "Unknown")}
          {renderFilterButton("gender", "Male", "Male")}
          {renderFilterButton("gender", "Female", "Female")}
          {renderFilterButton("gender", "Genderless", "Genderless")}
          {renderFilterButton("gender", "unknown", "Unknown")}
        </div>
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
