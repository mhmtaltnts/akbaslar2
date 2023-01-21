import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { useGetRaporNoteQuery } from './notesApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {
    useTitle('Kayıt Düzenle')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { note } = useGetRaporNoteQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    

    if (!note) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">Erişim Engeli</p>
        }
    }

    const content = <EditNoteForm note={note} />
    

    return content
}
export default EditNote