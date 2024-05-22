
import { Router } from "express";
import  { getContacts } from ('../controllers/apiContactController');

const router = Router();

router.get('/contacts', getContacts);

export default router;
