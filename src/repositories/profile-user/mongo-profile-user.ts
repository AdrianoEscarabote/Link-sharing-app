import {
  IProfileUserRepository,
  ProfileUserParams,
  getProfileUserParams,
  getProfileUserReturn,
  setProfileImageParams,
  setProfileImageReturn,
  setProfileUserDetailsReturn,
} from "@/controllers/profile-user/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage"
import storage from "@/lib/firebase"
import { ObjectId } from "mongodb"

export class MongoProfileUserRepository implements IProfileUserRepository {
  async setProfileUserDetails(
    params: ProfileUserParams,
  ): Promise<setProfileUserDetailsReturn> {
    const filter = { _id: new ObjectId(params.id) }

    const update = {
      $set: {
        firstName: params.firstName,
        lastName: params.lastName,
        previewEmail: params.previewEmail,
      },
    }

    const updatedUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOneAndUpdate(filter, update, {
        returnDocument: "after",
      })

    if (!updatedUser.value) {
      throw new Error("User does not exist")
    }

    const { firstName, lastName, previewEmail } = updatedUser.value

    return {
      firstName,
      lastName,
      previewEmail,
    }
  }
  async getProfileUserData(
    params: getProfileUserParams,
  ): Promise<getProfileUserReturn> {
    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(params.id),
    })

    if (!user) {
      throw new Error("User not find!")
    }

    const { firstName, lastName, previewEmail, links, profileImageUrl } = user

    return {
      firstName,
      lastName,
      previewEmail,
      links,
      profileImageUrl,
    }
  }
  async setProfileImage(
    params: setProfileImageParams,
  ): Promise<setProfileImageReturn> {
    const filter = {
      _id: new ObjectId(params.id),
    }

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    console.log("usario primeiro filtro", user)

    if (!user) {
      throw new Error()
    }

    const profileImage = params.file

    // Remove a imagem antiga, se existir
    if (user.profileImageName && user.profileImageUrl) {
      const oldImageRef = ref(
        storage,
        `images${params.id}/` + user.profileImageName,
      )
      await deleteObject(oldImageRef)
    }

    const storageRef = ref(
      storage,
      `images${params.id}/` + profileImage.originalname,
    )

    await uploadBytes(storageRef, profileImage.buffer).then(() => {
      getDownloadURL(storageRef).then(async (url) => {
        await MongoClient.db.collection<MongoUser>("users").findOneAndUpdate(
          filter,
          {
            $set: {
              profileImageName: profileImage.originalname,
              profileImageUrl: url,
            },
          },
          {
            returnDocument: "after",
          },
        )
      })
    })

    const updatedUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    if (!updatedUser) {
      throw new Error()
    }

    const { profileImageUrl } = updatedUser

    return {
      imageUrl: profileImageUrl,
    }
  }
}
