import { DataTableItems } from "@/components/Shared/DataTableItems"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function LoginElementsPage() {

    const session = await getServerSession()

    if(!session || !session.user?.email) {
        return redirect('/')
    }

    const user = await db.user.findUnique({
        where: {
            email: session?.user.email,
        },
        include: {
            elements: {
                where: {
                    typeElement: "Inicio de sesión",
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if(!user || !user.elements) {
        return redirect("/")
    }
  return (
    <div>
        <h1 className="text-xl md:text-3xl font-semibold">
            List of logins elements
        </h1>
        <DataTableItems elements={user.elements}/>
    </div>
  )
}
