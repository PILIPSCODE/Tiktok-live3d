export interface ResponseAi {
    comment:string,
    prev:boolean,
    response:string,
    animation:string,
    user:string,
} 

export interface Hooks {
    ResponseAi : ResponseAi[],
    Follow :string,
    Gift: string,
    Share: string,
    Join:string,
    isConnected:boolean,
}


export interface BubbleSettings {
    TypeBorder:string,
    CommentPosition:string,
    usernamePosition:string,
    ResponsePosition:string,
}
export interface VoiceSettings {
    voice:string,
    volume:string,
    rate:string,
    pitch:string,
}