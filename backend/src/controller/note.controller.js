import Note from '../models/note.model.js'
import mongoose from 'mongoose'

// read note
export async function getAllNote(_,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)
    } catch (error) {
        console.log("ERROR:", error); // مهم بزاف
        res.status(500).json({message:'internal server error'})
    }   
}

// create note
export async function createNote(req,res) {
    try {
        const {title,content} = req.body
        const newNote = new Note({title,content})
        await newNote.save()
        res.status(201).json({message:'note created a successfuly'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}

// update note
export async function updateNote(req,res) {
    try {
        const {title,content} = req.body
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'invalid id'})
        }
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updateNote) return res.status(404).json({message:'note found update'})
        res.status(200).json({message:'note updated successfuly'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}

// delete note
export async function deleteNote(req,res) {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'invalid id'})
        }
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote) return res.status(404).json({message:'note found delete'})   
        res.status(200).json({message:'note delete successfuly'})
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
}

// read by Id
export async function getById(req,res) {
    try {
          if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:'invalid id'})
        }
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:'note found delete'})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
  
}