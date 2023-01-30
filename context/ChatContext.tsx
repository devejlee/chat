import { createContext, useReducer, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Chat } from '@/typedef';

interface ChatContextProviderProps {
  children: ReactNode;
}

interface ChatState {
  chatId: string;
  user: Chat['userInfo'];
}

interface Action {
  type: string;
  payload: Chat['userInfo'];
}

interface ChatContextValue {
  data: ChatState;
  dispatch: React.Dispatch<Action>;
}

export const ChatContext = createContext<ChatContextValue>({
  data: {
    chatId: '',
    user: {
      name: '',
      email: '',
      image: ''
    }
  },
  dispatch: () => null
});

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { data: session } = useSession();

  const INITIAL_STATE: ChatState = {
    chatId: 'null',
    user: {
      name: '',
      email: '',
      image: ''
    },
  };

  const chatReducer = (state: ChatState, action: Action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        if (session?.user?.email) {
          return {
            user: action.payload,
            chatId: session?.user.email + action.payload.email,
          };
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
