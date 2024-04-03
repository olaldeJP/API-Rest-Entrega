import multer from "multer";
import { usersService } from "../services/users.service.js";
import { logger } from "../utils/winston.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";
    if (req.body.type === "profile") {
      uploadPath = "public/profile";
    } else if (req.body.type === "documents") {
      uploadPath = "public/documents";
    } else if (req.body.type === "products") {
      uploadPath = "public/products";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + " " + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFiles = upload.array("files", 4);

export async function updateFilesUser(req, res, next) {
  try {
    const files = req.files;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fileExist = await usersService.checkDocumentsArray(
        file,
        req.user.documents
      );
      if (!fileExist) {
        req.user.documents.push({
          name: file.originalname,
          reference: file.destination,
        });
      } else {
        logger.WARNING(`File ${file.originalname} Is Already Uploaded`);
      }
    }
    const updateUser = await usersService.actualizarArregloDocuments(req.user);
    next();
  } catch (error) {
    next(error);
  }
}
