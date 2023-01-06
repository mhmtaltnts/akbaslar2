const Note = require('../models/Note')
const User = require('../models/User')



// @desc Update a note
// @route PATCH /notes
// @access Private
const cikisNote = async (req, res) => {
    const { id, user, goturen} = req.body

    // Confirm data
    if (!id || !user || !goturen ) {
        return res.status(400).json({ message: 'Tüm alanları doldurun' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Bulunamadı' })
    }


    note.cikisYapan = user
    note.goturen = goturen
    note.cikisTarihi = Date.now()
    

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' güncellendi`)
}




module.exports = {
    cikisNote,
}