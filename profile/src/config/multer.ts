import multer, { Multer } from 'multer';
import path from "path";

const multerConfig: Multer = multer({
    storage: multer.memoryStorage(), // Store in memory instead of public folder
    limits: { fileSize: 10 * 1024 * 1024 }, // 2 MB limit (adjust as needed)
    fileFilter: (req: any, file: any, cb: any) => {
        const extension = path.extname(file.originalname);
        if (!['.jpg', '.jpeg', '.png', '.pdf'].includes(extension.toLowerCase())) {
            cb(new Error(`${extension} is unsupported file type!`), false);
            return;
        }
        cb(null, true);
    },
  });

export { multerConfig };
