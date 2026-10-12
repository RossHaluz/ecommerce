import { describe, expect, it } from "vitest";
import { clearFavorites, favoritesReducer, removeFavorite, resetFavorites, setAccountFavorites, toggleFavorite } from "./slice";

const item = (id: string) => ({ id, productName: id, title: id, catalogNumber: "OE", savedPrice: 10 });
const guest = (ids: string[]) => ({ items: ids.map(item), accountId: null });

describe("favorites slice", () => {
  it("adds a new favorite on top", () => {
    let state = favoritesReducer(undefined, toggleFavorite(item("a")));
    state = favoritesReducer(state, toggleFavorite(item("b")));
    expect(state.items.map((i) => i.id)).toEqual(["b", "a"]);
  });

  it("toggling an existing favorite removes it", () => {
    expect(favoritesReducer(guest(["a"]), toggleFavorite(item("a"))).items).toEqual([]);
  });

  it("removes by id and clears all", () => {
    const state = favoritesReducer(guest(["a", "b"]), removeFavorite("a"));
    expect(state.items.map((i) => i.id)).toEqual(["b"]);
    expect(favoritesReducer(state, clearFavorites()).items).toEqual([]);
  });

  it("takes the account list and remembers whose it is", () => {
    const state = favoritesReducer(guest(["a"]), setAccountFavorites({ accountId: "u1", items: [item("b")] }));
    expect(state).toEqual({ items: [item("b")], accountId: "u1" });
  });

  it("sign-out leaves an empty guest list", () => {
    expect(favoritesReducer({ items: [item("a")], accountId: "u1" }, resetFavorites())).toEqual({ items: [], accountId: null });
  });
});
