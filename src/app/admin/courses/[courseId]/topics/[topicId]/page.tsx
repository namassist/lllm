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
      <AuthLayout>
        <div className="w-full ">
          <TailwindAdvancedEditor data={topic?.description} readOnly={true} />
        </div>
      </AuthLayout>
    );
  }
}
