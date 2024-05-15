import { Button } from "@/components/ui/Button";

import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-2">
      <div>Projek Bobo</div>
      {session !== null && (
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button type="submit">LogOut</Button>
        </form>
      )}
    </main>
  );
}
