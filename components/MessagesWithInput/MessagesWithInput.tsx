import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { useSendMessages } from '@/hooks/useSendMessages';

export default function MessagesWithInput() {
  const sendMessages = useSendMessages();
  return (
    <>
      <Messages sendMessages={sendMessages} />
      <Input sendMessages={sendMessages} />
    </>
  );
}