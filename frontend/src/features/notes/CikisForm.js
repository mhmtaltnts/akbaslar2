import { useState, useEffect } from "react"
import { useCikisMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave} from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const CikisForm = ({ note }) => {

    const { username} = useAuth()

    const [cikisNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCikisMutation()


    const navigate = useNavigate()

    const [goturen, setGoturen] = useState(note.goturen)
    

    useEffect(() => {

        if (isSuccess ) {
            setGoturen('')            
            navigate('/dash/notes')
        }

    }, [isSuccess, navigate])

    const onGoturenChanged = e => setGoturen(e.target.value)
    

    const canSave = [goturen].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await cikisNote({ id: note.id, user: username, goturen})
        }
    }

    

    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validGoturenClass = !goturen ? "form__input--incomplete" : ''    

    const errContent = (error?.data?.message) ?? ''
    
    const content = (
        
        <div className="form_wrapper">
            <p className={errClass}>{errContent}</p>
            <div className="form__title-row">
            <h2>Park Araç Çıkışı</h2>
                <div className="form__action-buttons-wrapper">
                   <div className="form__action-buttons">
                        <button
                            className="form__button icon-button success__button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                    
                    
               </div>
            </div>

            <form className="form" onSubmit={e => e.preventDefault()}>
                                
                <input
                    className={`form__input ${validGoturenClass}`}
                    id="goturen"
                    name="goturen"
                    type="text"
                    autoComplete="off"
                    value={goturen}
                    placeholder="Götüren Çekici Plakası"
                    onChange={onGoturenChanged}
                />
                
            </form>
        </div>
        
    )

    return content
}

export default CikisForm