import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createStorage = (folder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = path.join(__dirname, '../uploads/');
      if (folder === 'works') {
        uploadPath = path.join(__dirname, '../uploads/works/');
      } else if (folder === 'promotions') {
        uploadPath = path.join(__dirname, '../uploads/promotions/');
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, folder + '-' + uniqueSuffix + ext);
    }
  });
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Только изображения разрешены (jpeg, jpg, png, gif, webp)'));
  }
};

export const upload = multer({
  storage: createStorage('general'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
});

export const uploadWorkPhoto = multer({
  storage: createStorage('works'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
});

export const uploadPromotion = multer({
  storage: createStorage('promotions'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
});

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ error: 'Файл слишком большой. Максимальный размер 10MB' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};