import express from "express"
import previewRoute from "./preview/preview"

const PreviewRouter = express.Router()

PreviewRouter.use("/Preview", previewRoute)

export default PreviewRouter
