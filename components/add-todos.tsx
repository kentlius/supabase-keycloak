import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddTodos() {
  async function createTodo(formData: FormData) {
    "use server";

    const supabase = createClient();

    const rawFormData = {
      task: formData.get("task"),
      user_id: (await supabase.auth.getUser()).data.user?.id,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          ...rawFormData,
        },
      ])
      .select();

    if (error) {
      console.error(error.message);
    }

    revalidatePath("/");
  }
  return (
    <form action={createTodo}>
      <Input type="text" name="task" />
      <Button type="submit" variant={"outline"}>
        Add Todo
      </Button>
    </form>
  );
}
