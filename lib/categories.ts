import { Category } from "@prisma/client";

export async function getCategories() {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const categoriesJson = await categories.json();
  if (categoriesJson.error) {
    return [];
  }
  return categoriesJson.data;
}

export async function getCategory(id: number) {
  const category = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?id=${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const categoryJson = await category.json();
  if (categoryJson.error) {
    return null;
  }
  return categoryJson.data;
}

export async function createCategory(category: Omit<Category, "category_id">) {
  const newCategory = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    }
  );
  const newCategoryJson = await newCategory.json();
  if (newCategoryJson.error) {
    return null;
  }
  return newCategoryJson.data;
}

export async function deleteCategory(id: number) {
  const deletedCategory = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?id=${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  const deletedCategoryJson = await deletedCategory.json();
  if (deletedCategoryJson.error) {
    return null;
  }
  return deletedCategoryJson.data;
}

export async function updateCategory(category: Category) {
  const updatedCategory = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?id=${category.category_id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    }
  );
  const updatedCategoryJson = await updatedCategory.json();
  if (updatedCategoryJson.error) {
    return null;
  }
  return updatedCategoryJson.data;
}
