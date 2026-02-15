export const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getIdFromSlug = (slug: string) => {
  return slug.split("-")[0];
};
