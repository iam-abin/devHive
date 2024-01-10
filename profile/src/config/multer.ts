import multer from 'multer';
import path from "path";

const multerConfig = multer({
    storage: multer.memoryStorage(), // Store in memory instead of public folder
    fileFilter: (req: any, file: any, cb: any) => {
        const extension = path.extname(file.originalname);
        if (
            extension !== ".jpg" &&
            extension !== ".jpeg" &&
            extension !== ".png" &&
            extension !== ".pdf"
        ) {
            cb(new Error(`${extension} is unsupported file type!`), false);
            return;
        }
        cb(null, true);
    },
  });

export { multerConfig };
