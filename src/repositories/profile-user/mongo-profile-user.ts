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
import { v4 as uuidv4 } from "uuid"

export class MongoProfileUserRepository implements IProfileUserRepository {
  async setProfileUserDetails(
    params: ProfileUserParams,
  ): Promise<setProfileUserDetailsReturn> {
    const filter = { _id: new ObjectId(params.id) }

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    if (!user?.uuid) {
      const update = {
        $set: {
          firstName: params.firstName,
          lastName: params.lastName,
          previewEmail: params.previewEmail,
          uuid: uuidv4(),
        },
      }
      const updateUser = await MongoClient.db
        .collection<MongoUser>("users")
        .findOneAndUpdate(filter, update, {
          returnDocument: "after",
        })

      if (!updateUser.value) {
        throw new Error("User does not exist")
      }
    } else {
      const updateUserDetails = {
        $set: {
          firstName: params.firstName,
          lastName: params.lastName,
          previewEmail: params.previewEmail,
        },
      }

      const updateUser = await MongoClient.db
        .collection<MongoUser>("users")
        .findOneAndUpdate(filter, updateUserDetails, {
          returnDocument: "after",
        })

      if (!updateUser.value) {
        throw new Error("User does not exist")
      }
    }

    const updatedUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    if (!updatedUser) throw new Error()

    const { firstName, lastName, previewEmail, uuid } = updatedUser

    return {
      firstName,
      lastName,
      previewEmail,
      uuid,
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

    const { uuid, firstName, lastName, previewEmail, links, profileImageUrl } =
      user

    return {
      uuid,
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

    if (!user) {
      throw new Error()
    }

    const profileImage = params.file

    // Remove the old image, if it exists
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
