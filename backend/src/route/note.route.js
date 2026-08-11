import express from 'express'
import {getAllNote,createNote,updateNote,deleteNote,getById} from '../controller/note.controller.js'

const router = express.Router()


router.get('/',getAllNote)

router.get('/:id',getById)

router.post('/',createNote)

router.put('/:id',updateNote)

router.delete('/:id',deleteNote)



export default router