import { useParams } from 'react-router-dom'
import EditGumrukForm from './GumrukForm'
import { useGetNotesQuery } from './notesApiSlice'
/* import useAuth from '../../hooks/useAuth' */
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditGumruk = () => {
    useTitle('Gümrük Girişi')

    const { id } = useParams()

    /* const { username, isManager, isAdmin } = useAuth() */

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    

    if (!note) return <PulseLoader color={"#FFF"} />


    /* if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    } */

    const content = <EditGumrukForm note={note} />

    return content
}
export default EditGumruk