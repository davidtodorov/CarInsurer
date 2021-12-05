import controllers from '../controllers'
import app from 'express';
import { handlePromiseErrors } from './errorHandlingRouter';
import multer from 'multer';

const router = app.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      } else  if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      } else {
          throw new  Error("Upload png or jpeg!");
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

let upload = multer({ storage });

router.get('/', handlePromiseErrors(controllers.events.get));
router.get('/:id', handlePromiseErrors(controllers.events.get));
router.post('/', upload.array('file'), handlePromiseErrors(controllers.events.post));

export default router;


