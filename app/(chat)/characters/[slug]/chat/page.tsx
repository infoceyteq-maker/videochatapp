import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHARACTERS, getCharacter } from "@/lib/data";
import ChatThread from "@/components/chat/ChatThread";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  return { title: c ? `Chat with ${c.name.split(" ")[0]}` : "Chat" };
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-3xl md:py-4 md:pr-4">
      <ChatThread character={c} />
    </div>
  );
}
