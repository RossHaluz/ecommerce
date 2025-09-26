const latinToCyrillicMap: Record<string, string> = {
  shch: "щ",
  zh: "ж",
  kh: "х",
  ts: "ц",
  ch: "ч",
  sh: "ш",
  yu: "ю",
  ya: "я",
  ye: "є",
  yi: "ї",

  a: "а",
  b: "б",
  v: "в",
  g: "г",
  d: "д",
  e: "е",
  z: "з",
  y: "и",
  i: "і",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  f: "ф",
};

function latinToCyrillic(text: string): string {
  const patterns = Object.keys(latinToCyrillicMap).sort(
    (a, b) => b.length - a.length
  );

  let result = text.toLowerCase();
  for (const pattern of patterns) {
    const regex = new RegExp(pattern, "g");
    result = result.replace(regex, latinToCyrillicMap[pattern]);
  }

  result = result.replace(/-/g, " ");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default latinToCyrillic;
