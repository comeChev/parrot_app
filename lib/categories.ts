import { Category } from "@prisma/client";

export async function getCategories() {
  const categories = await fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });
  const categoriesJson = await categories.json();
  if (categoriesJson.error) {
    console.log(categoriesJson.error);
    return [];
  }
  return categoriesJson.data;
}

export async function getCategory(id: number) {
  const category = await fetch(`/api/categories?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const categoryJson = await category.json();
  if (categoryJson.error) {
    console.log(categoryJson.error);
    return null;
  }
  return categoryJson.data;
}

export async function createCategory(categoryName: string) {
  const newCategory = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category_name: categoryName }),
  });
  const newCategoryJson = await newCategory.json();
  if (newCategoryJson.error) {
    console.log(newCategoryJson.error);
    return null;
  }
  return newCategoryJson.data;
}
