import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { countPasswords } from "@/lib/countPasswords";
import RepeatPasswordChart from "./components/RepeatPasswordChart/RepeatPasswordChart";
import ViewsAnalyticsChart from "./components/ViewsAnalyticsChart/ViewsAnalyticsChart";
import { TrafficDevice } from "./components/TrafficDevice";

export default async function AnalyticsPage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      elements: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user || !user.elements) {
    return redirect("/");
  }

  const { unique, repeat } = countPasswords(user.elements);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <RepeatPasswordChart repeat={repeat} unique={unique} />
        <ViewsAnalyticsChart repeat={repeat} unique={unique} />
      </div>
      <TrafficDevice/>
    </div>
  );
}
