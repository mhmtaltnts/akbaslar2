import { useParams } from 'react-router-dom'
import CikisForm from './CikisForm'
import { useGetNotesQuery } from './notesApiSlice'
/* import useAuth from '../../hooks/useAuth' */
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const Cikis = () => {
    useTitle('Çıkış Yap')

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

    const content = <CikisForm note={note} />

    return content
}
export default Cikis