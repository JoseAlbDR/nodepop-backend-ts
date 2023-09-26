import multer from 'multer';

const fileUpload = (folder: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, `./src/public/uploads/${folder}`);
    },
    filename: (_req, file, cb) => {
      const fileName = Date.now() + file.originalname;
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

export default fileUpload;
