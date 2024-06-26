import AddTopics from "@/components/forms/add-topics";
import AuthLayout from "@/components/layouts/AuthLayout";
import TailwindAdvancedEditor from "@/components/novel/advanced-editor";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <AuthLayout>
      <div className="w-full space-y-5 mt-5">
        <AddTopics course_id={params.courseId} />
        <TailwindAdvancedEditor readOnly={false} />
      </div>
    </AuthLayout>
  );
}
