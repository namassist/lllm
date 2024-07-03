import AuthLayout from "@/components/layouts/AuthLayout";
import TailwindAdvancedEditor from "@/components/novel/advanced-editor";
import { getTopicByCourse } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: { courseId: string; topicId: string };
}) {
  if (params.topicId) {
    const topic = await getTopicByCourse(params.topicId);

    return (
      <AuthLayout isStudent>
        <div className="w-full mt-8 space-y-8">
          <h1 className="text-3xl font-bold">Chapter 1 : {topic?.title}</h1>
          <TailwindAdvancedEditor data={topic?.description} readOnly={true} />
        </div>
      </AuthLayout>
    );
  }
}
