import { createContext, useReducer, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { ChatData } from '@/typedef';

interface ChatContextProviderProps {
  children: ReactNode;
}

interface ChatState {
  chatId: string | null;
  user: ChatData['userInfo'];
  isSendingMessage: boolean,
}

interface Action {
  type: string;
  payload?: ChatData['userInfo'];
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
    },
    isSendingMessage: false,
  },
  dispatch: () => null
});

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { data: session } = useSession();

  const INITIAL_STATE: ChatState = {
    chatId: null,
    user: {
      name: '',
      email: '',
      image: ''
    },
    isSendingMessage: false
  };

  const chatReducer = (state: ChatState, action: Action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        if (session?.user?.email && action.payload) {
          return {
            ...state,
            user: action.payload,
            chatId: `${session?.user.email}+${action.payload.email}`,
          };
        }
      case 'SENDING_MESSAGE':
        return {
          ...state,
          isSendingMessage: true
        };
      case 'NOT_SENDING_MESSAGE':
        return {
          ...state,
          isSendingMessage: false
        };
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
