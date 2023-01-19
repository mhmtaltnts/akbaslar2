
import { useGetRaporQuery } from './notesApiSlice'
import { memo } from 'react'

const RaporNote = ({ noteId, page }) => {

    const { note   } = useGetRaporQuery(page, {
        selectFromResult: ({ data }) => ({
            note: data?.notes.entities[noteId]
        }),
    })


    if (note) {

        let options = {
            dateStyle: "short",
            timeStyle: "short",
            

        }
        const created = new Date(note.createdAt).toLocaleString('tr-TR', options)

        const cikisTarihi =note.cikisTarihi === undefined ? "" : new Date(note.cikisTarihi).toLocaleString('tr-TR', options)

        const kaldigiGun =note.cikisTarihi === undefined ? "" : Math.ceil( (new Date(note.cikisTarihi).getTime() - new Date(note.createdAt).getTime())/(1000 * 3600 * 24))

        return (
            <tr className="table__row">
                <td className="table__cell ">{note.dorse}</td>
                <td className="table__cell mobile">{note.getiren}</td>
                <td className="table__cell ">{note.goturen}</td>
                <td className="table__cell ">{note.firma}</td>
                <td className="table__cell tablet">{note.mal}</td>
                <td className="table__cell ">{note.gumruk}</td>
                <td className="table__cell tablet">{created}</td>
                <td className="table__cell tablet">{cikisTarihi}</td>
                <td className="table__cell">{kaldigiGun}</td>
            </tr>
        )

    } else return null
}

const memoizedRapor = memo(RaporNote)

export default memoizedRapor