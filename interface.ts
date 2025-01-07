export interface ResponseAi {
  comment: string;
  prev: boolean;
  response: string;
  animation: string;
  user: string;
}

export interface Hooks {
  ResponseAi: ResponseAi[];
  Follow: string;
  Gift: string;
  Share: string;
  Join: string;
  isConnected: boolean;
}

export interface BubbleSettings {
  TypeBorder: string;
  CommentPosition: string;
  usernamePosition: string;
  ResponsePosition: string;
}
export interface VoiceSettings {
  voice: string;
  volume: string;
  rate: string;
  pitch: string;
}
export interface MusicType {
  audio: string;
  title: string;
  thumbnails: string;
}

export interface Interaction {
  type: string;
  animation: string;
  audio: string;
  gift: string;
}
export interface InteractionQueue {
  type: string;
  animation: string;
  uniqueId: string;
  audio: string;
  gift: string;
}

export interface GiftData {
  giftName: string;
  uniqueId: string;
  photoProfile: string;
  diamondCount: number;
}

export interface ResorceType {
  name: string;
  type: string;
  Base64: string;
}
