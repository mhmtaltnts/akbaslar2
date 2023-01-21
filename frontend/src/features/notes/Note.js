import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'
import useAuth from '../../hooks/useAuth'

const Note = ({ noteId }) => {
    const { isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    let options = {
        dateStyle: "short",
        timeStyle: "short",
    }

    const navigate = useNavigate()
    /* const yonClass = isAdmin || isManager ? "yonetici" : ""; */
    const created = new Date(note.createdAt).toLocaleString('tr-TR', options)
    if (note) {
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)
        const handleCikis = () => navigate(`/dash/cikis/${noteId}`)
        const handleGumruk = () => navigate(`/dash/gumruk/${noteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell mobile">{note.getiren}</td>
                <td className="table__cell">{note.dorse}</td>
                <td className="table__cell tablet">{note.firma}</td>
                <td className="table__cell tablet">{note.mal}</td>
                <td className="table__cell ">{note.gumruk}</td>
                <td className="table__cell tablet">{created}</td>
                <td className="table__cell tablet">{note.girisYapan}</td>
                
                <td className="table__cell table-th__button">
                    <button
                        className="button__success"
                        onClick={handleGumruk}
                    >
                       Gümrük
                    </button>
                </td>
                
                <td className="table__cell table-th__button">
                    <button
                        className="button__danger"
                        onClick={handleCikis}
                    >
                      ÇıkışYap
                    </button>
                </td>

                {(isAdmin || isManager) && <td className="table__cell table-th__button">
                    <button
                        className="button__warning"
                        onClick={handleEdit}
                    >
                        Değiştir
                    </button>
                </td>}
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote