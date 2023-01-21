import {useState} from "react";
import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import SearchBar from "../../components/SearchBar/SearchBar"


const NotesList = () => {
    useTitle('Kayıtları Listele');  
        
    const {status, isManager, isAdmin } = useAuth()
    

    const [search, setSearch] = useState("")
    
    const calClass = (!isAdmin && !isManager) ? "calisan" : "yonetici";

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    
    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
    
    if (isSuccess) {
        let filteredIds
        const { ids, entities } = notes
        let count = ids.length
        if(!search){
            filteredIds = [...ids]
        } else{
            filteredIds = ids.filter(noteId => { return entities[noteId].dorse.toLowerCase().includes(search.toLowerCase())})

        }
               

        const tableContent = ids?.length && filteredIds.sort((a, b) => {return 0}).map(noteId => <Note key={noteId} noteId={noteId} />)
    
        content = (<>
        <div className="searchAndCount">
            <h2 className="aracsayisi">Parkta mevcut araç sayısı: {count}</h2>
            <SearchBar setSearch={setSearch}/>
        </div>

            <table className={`table table--notes ${calClass}`}>
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="mobile" >Getiren Çekici</th>
                        <th scope="col" >Dorse Plakası</th>
                        <th scope="col" className="tablet">Firma</th>
                        <th scope="col" className="tablet">Malın Cinsi</th>
                        <th scope="col" >Gümrük Bilgi</th>
                        <th scope="col" className="tablet">Giriş Tarihi</th>
                        <th scope="col" className="tablet">Giriş Yapan</th>
                        <th scope="col" className="">   </th>  
                        <th scope="col" className="">   </th>
                        {(isAdmin || isManager) && <th scope="col" >  </th>}
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </>
        )
    
        }
    return content
}
export default NotesList