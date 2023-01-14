import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth'
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = () => {

    const { username} = useAuth()

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [getiren, setGetiren] = useState('')
    const [dorse, setDorse] = useState('')
    const [firma, setFirma] = useState('')
    const [mal, setMal] = useState('')
    

    useEffect(() => {
        if (isSuccess) {
            setGetiren('')
            setDorse('')
            setFirma('')
            setMal('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onGetirenChanged = e => setGetiren(e.target.value)
    const onDorseChanged = e => setDorse(e.target.value)
    const onFirmaChanged = e => setFirma(e.target.value)
    const onMalChanged = e => setMal(e.target.value)

    const canSave = [getiren, dorse].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: username, getiren, dorse, firma })
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const validGetirenClass = !getiren ? "form__input--incomplete" : ''
    const validDorseClass = !dorse ? "form__input--incomplete" : ''
    
    

    const content = (
        <div className="form_wrapper">
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>Yeni Park Girişi</h2>
                </div>
                <div className="form__action-buttons">
                    <button
                        className="form__button icon-button success__button"
                        title="Save"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
                <label className="form__label" htmlFor="getiren">
                    Getiren Çekici Plakası:</label>
                <input
                    className={`form__input ${validGetirenClass}`}
                    id="getiren"
                    name="getiren"
                    type="text"
                    autoComplete="off"
                    value={getiren}
                    onChange={onGetirenChanged}
                />

                <label className="form__label" htmlFor="dorse">
                    Dorse Plakası:</label>
                <input
                    className={`form__input form__input--text ${validDorseClass}`}
                    id="dorse"
                    name="dorse"
                    type="text"
                    autoComplete="off"
                    value={dorse}
                    onChange={onDorseChanged}
                />
                <label className="form__label" htmlFor="firma">
                    Firma:</label>
                <input
                    className={`form__input form__input--text`}
                    id="firma"
                    name="firma"
                    type="text"
                    autoComplete="off"
                    value={firma}
                    onChange={onFirmaChanged}
                />
                
                <label className="form__label" htmlFor="firma">
                    Malın Cinsi:</label>
                <input
                    className={`form__input form__input--text `}
                    id="mal"
                    name="mal"
                    type="text"
                    autoComplete="off"
                    value={mal}
                    onChange={onMalChanged}
                />
                               
            </form>
        </div>
    )

    return content
}

export default NewNoteForm