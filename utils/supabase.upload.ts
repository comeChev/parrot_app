import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: { persistSession: false },
  }
);

// Upload file using standard upload
export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .upload(`/${path}/${file.name}`, file);
  if (error) {
    console.log(error);
    return { success: false, data: error.message };
  } else {
    return { success: true, data: data.path };
  }
}

export async function deleteFile(path: string) {
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET as string)
    .remove([path]);
  if (error) {
    return { success: false, data: error.message };
  } else {
    return { success: true, data: "Supprimé avec succès" };
  }
}

export function createImageURL(fileKey: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${fileKey}`;
}
