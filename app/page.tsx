import { signInWithKeycloak, signOut } from "@/app/actions";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LoginButton } from "@/components/login-button";
import { AddTodos } from "@/components/add-todos";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: todos, error } = await supabase.from("todos").select("*");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl">
            logged in as <span className="font-bold">{user?.email}</span>
          </h1>
          <form action={signOut}>
            <Button variant={"destructive"}>Sign out</Button>
          </form>
          <div>
            <Table>
              <TableCaption>A list of todos.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todos?.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.task}</TableCell>
                    <TableCell>{todo.is_complete ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <AddTodos />
          </div>
        </div>
      ) : (
        <form action={signInWithKeycloak}>
          <LoginButton />
        </form>
      )}
    </main>
  );
}
