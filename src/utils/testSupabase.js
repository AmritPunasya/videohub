import { supabase } from "./supabase";

export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");

    // Fetch any rows from your users table
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (error) throw error;

    if (data.length > 0) {
      console.log("✅ Supabase connection is working!");
      console.log("Fetched sample data:", data);
    } else {
      console.log("⚠️ Connection is fine, but no data in 'users' table.");
    }
  } catch (err) {
    console.error("❌ Supabase connection failed:", err.message);
  }
}
