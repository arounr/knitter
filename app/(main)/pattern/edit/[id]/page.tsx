interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center px-4">
      <h1>Edit Page for pattern {id}</h1>
    </div>
  );
}
