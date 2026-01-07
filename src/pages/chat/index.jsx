import dynamic from "next/dynamic";

const ChatClient = dynamic(
  () => import("@/components/wrappers/chat_ui"),
  { ssr: false }
);

export default function ChatPage() {
  return <ChatClient />
}