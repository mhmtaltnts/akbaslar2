const Note = require('../models/Note')
const User = require('../models/User')

// @desc Get all notes 
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
    // Get all notes from MongoDB

    const sort = [['_id', -1]]
    const notes = await Note.find({ cikisTarihi: { $exists: false} }).sort(sort).lean()
    
    // If no notes 
    if (!notes?.length) {
        return res.status(400).json({ message: 'Kayıt bulunamadı' })
    }

    res.json(notes)
}

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = async (req, res) => {
    const { user, getiren, dorse, firma, mal } = req.body

    /* // Confirm data
    if (!user || !getiren || !dorse || !firma) {
        return res.status(400).json({ message: 'Tüm alanlar doldurulmalı' })
    }
 */
    // Create and store the new user 
    const note = await Note.create({ girisYapan: user, getiren, dorse, firma, mal })

    if (note) { // Created 
        return res.status(201).json({ message: 'Yeni kayıt oluşturuldu' })
    } else {
        return res.status(400).json({ message: 'Geçersiz veri girişi' })
    }

}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = async (req, res) => {
    const { id, user, getiren, dorse, firma, mal, gumruk } = req.body
    
    // Confirm data
    /* if (!id || !user || !getiren || !dorse || !firma || !mal) {
        return res.status(400).json({ message: 'Tüm alanlar doldurulmalı' })
    } */

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Kayıt bulunamadı' })
    }


    note.guncelleyen = user
    note.getiren = getiren
    note.dorse = dorse
    note.firma = firma
    note.mal = mal
    note.gumruk = gumruk

    const updatedNote = await note.save()

    res.json(`'${updatedNote.dorse}' güncellendi`)
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Kayıt ID gerekli' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Kayıt bulunamadı' })
    }

    const result = await note.deleteOne()

    const reply = ` '${result.dorse}' dorse numaralı silindi`

    res.json(reply)
}

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}