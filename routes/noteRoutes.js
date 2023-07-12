var express = require('express');
var router=express.Router();

var Note = require('../models/noteModel');

router.get('/',async(req,res)=>{
    try{
        console.log(req);
        const notes= await Note.find();
        res.status(202).json(notes);

    }
    catch(err){
        res.status(500).json({'error': err.message});
        console.log("error in get /", err.message);
    }
    

})

router.post('/', async(req,res)=>{
    try{
        const {title, user_id,note_collection, content} = req.body;

        const noteCreated = new Note({title, user_id,note_collection, content } );

        const noteSaved = await noteCreated.save();

        res.status(202).json(noteSaved);




    }
    catch(error){
        res.status(500).json({'message': error.message})

    }
})
router.get('/recent', async (req, res) => {
    try {
      const recentNotes = await Note.find()
        .sort({ timeStamp: -1 }) ; 
  
      res.status(200).json(recentNotes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, user_id, note_collection, content } = req.body;
  
      const updatedNote = await Note.findByIdAndUpdate(id, {
        title,
        user_id,
        note_collection,
        content,
      }, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  

module.exports=router;