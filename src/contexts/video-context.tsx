import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';

interface IVideo {
  id: string;
  name: string;
  path: string;
  transcription?: string;
  createdAt: string;
}

export interface IVideoState {
  selectedVideo: IVideo | null;
  setSelectedVideo: (video: IVideo) => void;
}

const SelectedVideoContext = createContext({} as IVideoState);

interface SelectedVideoContextProviderProps {
  children: ReactNode;
}

export function SelectedVideoContextProvider({
  children,
}: SelectedVideoContextProviderProps): JSX.Element {

  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null)


  return (
    <SelectedVideoContext.Provider value={{selectedVideo, setSelectedVideo}}>
      {children}
    </SelectedVideoContext.Provider>
  );
}

export function useSelectedVideo(): IVideoState {
  return useContext(SelectedVideoContext);
}