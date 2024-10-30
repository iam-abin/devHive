import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client'; // Import Socket type from socket.io-client
import socket from '../config/socket';

type SocketState = {
  socket: Socket | null;
}

const SocketContext = createContext<SocketState>({ socket: null });

type SocketProviderProps = {
  children: ReactNode;
  currentUserId: string
}

export const SocketProvider = ({ children, currentUserId }: SocketProviderProps): JSX.Element => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  
  useEffect(() => {
    setSocketInstance(socket);
    socket.connect()
    console.log('Socket Connected....');
    socket.emit("addActiveUser", currentUserId);

    return () => {
      socketInstance?.disconnect();
      console.log('Socket disconnected!!!');
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketState => {
  return useContext(SocketContext);
};
