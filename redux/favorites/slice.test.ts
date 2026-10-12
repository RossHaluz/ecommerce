import { describe, expect, it } from "vitest";
import { clearFavorites, favoritesReducer, removeFavorite, toggleFavorite } from "./slice";

const item = (id: string) => ({ id, productName: id, title: id, catalogNumber: "OE", savedPrice: 10 });

describe("favorites slice", () => {
  it("adds a new favorite on top", () => {
    let state = favoritesReducer(undefined, toggleFavorite(item("a")));
    state = favoritesReducer(state, toggleFavorite(item("b")));
    expect(state.items.map((i) => i.id)).toEqual(["b", "a"]);
  });

  it("toggling an existing favorite removes it", () => {
    const state = favoritesReducer({ items: [item("a")] }, toggleFavorite(item("a")));
    expect(state.items).toEqual([]);
  });

  it("removes by id and clears all", () => {
    const state = favoritesReducer({ items: [item("a"), item("b")] }, removeFavorite("a"));
    expect(state.items.map((i) => i.id)).toEqual(["b"]);
    expect(favoritesReducer(state, clearFavorites()).items).toEqual([]);
  });
});
