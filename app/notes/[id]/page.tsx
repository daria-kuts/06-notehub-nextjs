import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../../../components/TanStackProvider/getQueryClient";
import { fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
