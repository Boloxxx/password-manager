import { getServerSession } from "next-auth";
import { FormGenerator } from "./FormGenerator";
import HeaderGenerator from "./HeaderGenerator/HeaderGenerator";
import { redirect } from "next/navigation";

export default async function GeneratorPage() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return redirect("/");
  }
  return (
    <div>
        <HeaderGenerator/>
        <FormGenerator/>
    </div>
  )
}
