import React, { useEffect, useState } from 'react'
import NotesNotFound from '../components/NoteNotFound.jsx'
import Navbar from '../components/navbar.jsx'
import NoteCard from '../components/NoteCard.jsx'
import RateLimite from '../components/RateLimite.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../components/lib/axio.js'

const homePage = () => {
  const [isRateLimit,setIsRateLimit] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)
  
  useEffect(()=>{
       const fetchNotes = async () => {
        try {
          const res = await api.get('/notes')
          console.log(res.data);
          setNotes(res.data)
          setIsRateLimit(false)
        } catch (error) {
          console.log('error fetching notes');
          console.log(error);
          if(error.response?.status === 429){
            setIsRateLimit(true)
          }
          else{
            toast.error('failed to load notes')
          }
        }finally{
          setLoading(false)
        }
       }
       fetchNotes()
  },[])
  return (
    <div className="min-h-screen">
      <Navbar/>
      {isRateLimit && <RateLimite/>}
      <div>
        {loading && <div className='text-center text-primary py-10'>Loading notes ...</div>}
      </div>
       
      {notes.length === 0 && !isRateLimit && <NotesNotFound/>}

      {notes.length > 0 && !isRateLimit && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-[30px]'>
           {
          notes.map((note)=>{
                return (
                 <NoteCard key={note._id} note = {note} setNotes={setNotes} />
                )
              })
           }
        </div>
      )}
    </div>
  )
}

export default homePage