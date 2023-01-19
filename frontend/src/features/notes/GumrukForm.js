import { useState, useEffect } from "react"
import { useGumrukMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave} from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditGumrukForm = ({ note }) => {

    const { username} = useAuth()

    const [cikisNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useGumrukMutation()


    const navigate = useNavigate()

    const [gumruk, setGumruk] = useState(note.gumruk)
    

    useEffect(() => {

        if (isSuccess ) {
            setGumruk('')            
            navigate('/dash/notes')
        }

    }, [isSuccess, navigate])

    const onGumrukChanged = e => setGumruk(e.target.value)
    

    const canSave = [gumruk].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await cikisNote({ id: note.id, user: username, gumruk})
        }
    }

    

    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validGumrukClass = !gumruk ? "form__input--incomplete" : ''
    

    const errContent = (error?.data?.message) ?? ''


    
    const content = (
        <div className="form_wrapper">
            <p className={errClass}>{errContent}</p>
            <div className="form__title-row">
            <h2>Gümrük Veri Girişi</h2>                
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
                    className={`form__input ${validGumrukClass}`}
                    id="gumruk"
                    name="gumruk"
                    type="text"
                    autoComplete="off"
                    placeholder="Gümrük bilgilerini yzınız"
                    value={gumruk}
                    onChange={onGumrukChanged}
                />
                               
            </form>
        </div>
    )

    return content
}

export default EditGumrukForm