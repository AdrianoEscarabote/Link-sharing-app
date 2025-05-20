import PreviewController from "@/controllers/preview-user/preview-user"
import { PreviewUserRepository } from "@/repositories/preview-user/mongo-preview-user"
import express from "express"

const previewRoute = express.Router()

previewRoute.get("/:uuid", async (req, res) => {
  try {
    if (!req.params.uuid) {
      return res.status(400).json({
        msg: "uuid not found!",
      })
    }

    const previewUserRepository = new PreviewUserRepository()

    const previewUserController = new PreviewController(previewUserRepository)

    const { body, statusCode } = await previewUserController.handle({
      body: req.params,
    })

    return res.status(statusCode).send(body)
  } catch (error) {
    return res.status(500).json({
      msg: "server error!",
    })
  }
})

export default previewRoute
