"use client";

import { useFavoriteRows } from "../hooks/use-favorite-rows";
import { FavoritesHeading } from "./favorites-heading";
import { FavoritesEmpty } from "./favorites-empty";
import { FavoritesSummary } from "./favorites-summary";
import { FavoriteRow } from "./favorite-row";

export const FavoritesView = () => {
  const rows = useFavoriteRows();

  return (
    <section className="flex flex-col gap-4">
      <FavoritesHeading ids={rows.map((row) => row.item.id)} />
      {rows.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          <ul className="flex flex-col gap-2">
            {rows.map((row) => (
              <FavoriteRow key={row.item.id} row={row} />
            ))}
          </ul>
          <div className="lg:sticky lg:top-24">
            <FavoritesSummary rows={rows} />
          </div>
        </div>
      )}
    </section>
  );
};
