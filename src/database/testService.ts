import { supabase } from "../supabase.client.js";

export class TestService {
    async getAll() {
        const { data, error } = await supabase.from("test").select("*");

        if (error) {
            console.error("Supabase error:", error);
            throw new Error(error.message);
        }

        return data;
    }
}

