export type User = {
  id: string,
  username: string,
  likes?: string[],
  dislikes?: string[],
  flavours?: string[]
}

export type CreateUser = {
  username: string,
  password: string
}