export interface ResponseAi {
  comment: string;
  prev: boolean;
  response: string;
  img: string;
  playOn: string;
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

export interface commandInteraction {
  command: string;
  expression: string;
}

export interface setAnimation {
  animation: string;
  playOn: string;
}

export interface hairStyle {
  position: string;
  hairImg: string;
  scale: string;
}

export interface BubbleSettings {
  TypeBorder: string;
  CommentPosition: string;
  TextSpeed: string;
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
  uniqueId: string;
}

export interface ReqMusic {
  Title: string;
  img: string;
  uniqueId: string;
}

export interface Interaction {
  type: string;
  animation: string;
  audio: string;
  gift: string;
}
export interface Interaction2d {
  type: string;
  gif: string;
  audio: string;
  gift: string;
}
export interface InteractionQueue {
  type: string;
  animation: string;
  uniqueId: string;
  gif: string;
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
