import { UserTypes } from "@/models/User"

export type MongoUser = Omit<UserTypes, "id">
