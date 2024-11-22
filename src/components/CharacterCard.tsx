"use client";
import { Character } from "@/types";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden transition-shadow cursor-pointer hover:shadow-md">
      <div className="aspect-square relative">
        <img
          src={character.image}
          alt={character.name}
          className="absolute w-full h-full object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{character.name}</h3>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-semibold">Status:</span>
            <span
              className={`ml-1 ${
                character.status === "Alive"
                  ? "text-green-600"
                  : character.status === "Dead"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {character.status}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Gender:</span>
            <span className="ml-1 text-gray-600">{character.gender}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Species:</span>
            <span className="ml-1 text-gray-600">{character.species}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Type:</span>
            <span className="ml-1 text-gray-600">
              {character.type || "Unknown"}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Origin:</span>
            <span className="ml-1 text-gray-600">{character.origin.name}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Location:</span>
            <span className="ml-1 text-gray-600">
              {character.location.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
