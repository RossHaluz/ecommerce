/** Номер слайда, що зараз у кадрі, за прокруткою стрічки (кожен слайд — на всю ширину). */
export const slideIndexAt = (scrollLeft: number, slideWidth: number, count: number): number => {
  if (slideWidth <= 0 || count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.round(scrollLeft / slideWidth)));
};
