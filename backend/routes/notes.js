const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const { query, validationResult, body } = require("express-validator");
const { wait } = require('@testing-library/user-event/dist/utils');

//Route1:To Get All Notes
router.get('/fetchallnotes' ,fetchuser ,async (req,res)=>{
    try {
        let success = false;
        const notes = await Notes.find({user: req.user.id});
        success = true;
        res.json({notes,success});
    } catch (error) {
        success = false;
        res.status(500).json({"message":"Internal Server Error",success:success});
    }
   
})


//Route2:To Add A Note
router.post('/addnotes' ,[
    body('title',"Title Can Not Smaller Than 3 Character").isLength({min:3}),
    body('description',"Description Can Not Be Samller Than 5 Characer").isLength({min:5}),
]
, fetchuser, async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array(), success:success});
    }
    try {

        const data = {
            user: req.user.id,
            title: req.body.title,
            description:req.body.description,
            tag:req.body.tag,
        }

        const notes = new Notes(data);
        const saved_notes = await notes.save();
        success = true
        res.json({saved_notes,success});
        success = false;

    
    } catch (error) {
         res.status(500).json({"message":"Internal Server Error",success:success});
    }
    
})


//Route2:To Update A Note
router.patch('/updatenote/:id',fetchuser, async(req,res)=>{
    try {
    let success = false;
    const{title,description,tag} = req.body;

    const newNote = {};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).json({"message":"Not Found",success:success});
    }
    const fetch_userid = note.user.toString();
    if(fetch_userid !== req.user.id){
        return res.status(401).json({"message":"Not Allowed",success:success});
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
    success = true;
    res.json({note,success});
    success = false;
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error",success:success});
    }
})


//Route4:to Delete A Note
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
    try {
        let success = false;
        let note =await Notes.findById(req.params.id);
        if(!note){
            res.status(404).json({"message":"Not Found",success:success});
        }
        const user_id = note.user.toString();
        if(user_id !== req.user.id){
            res.status(401).json({"message":"Not Allowed",success:success})
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        success= true;
        res.json({"message":"Note Deleted", note:note,success:success});
        success= false;
    } catch (error) {
        res.status(500).json({"message":"Internal Server Error"});
    }
})




module.exports = router;