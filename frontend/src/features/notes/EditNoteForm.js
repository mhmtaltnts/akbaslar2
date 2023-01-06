import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditNoteForm = ({ note }) => {

    const { username, isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [getiren, setGetiren] = useState(note.getiren)
    const [dorse, setDorse] = useState(note.dorse)
    const [firma, setFirma] = useState(note.firma)
    const [mal, setMal] = useState(note.mal)
    const [gumruk, setGumruk] = useState(note.gumruk)
    const [goturen, setGoturen] = useState(note.goturen)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setGetiren('')
            setDorse('')
            setFirma('')
            setMal('')
            setGumruk('')
            setGoturen('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onGetirenChanged = e => setGetiren(e.target.value)
    const onDorseChanged = e => setDorse(e.target.value)
    const onFirmaChanged = e => setFirma(e.target.value)
    const onMalChanged = e => setMal(e.target.value)
    const onGumrukChanged = e => setGumruk(e.target.value)
    const onGoturenChanged = e => setGoturen(e.target.value)

    const canSave = [getiren, dorse].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: username, getiren, dorse, firma, mal, gumruk, goturen })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validGetirenClass = !getiren ? "form__input--incomplete" : ''
    const validDorseClass = !dorse ? "form__input--incomplete" : ''
    
    

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <div className="form_wrapper">
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Kayıt Düzenle</h2>                    
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
                    type= "text"
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
                    type= "text"
                    autoComplete="off"
                    value={firma}
                    onChange={onFirmaChanged}
                />
                <label className="form__label" htmlFor="mal">
                    Malın cinsi:</label>
                <input
                    className={`form__input form__input--text`}
                    id="mal"
                    name="mal"
                    type= "text"
                    autoComplete="off"
                    value={mal}
                    onChange={onMalChanged}
                />
                <label className="form__label" htmlFor="gumruk">
                    Gümrük Bilgi:</label>
                <input
                    className={`form__input form__input--text`}
                    id="gumruk"
                    name="gumruk"
                    type= "text"
                    autoComplete="off"
                    value={gumruk}
                    onChange={onGumrukChanged}
                />
                <label className="form__label" htmlFor="goturen">
                    Götüren Çekici Plakası:</label>
                <input
                    className={`form__input form__input--text`}
                    id="goturen"
                    name="goturen"
                    type= "text"
                    autoComplete="off"
                    value={goturen}
                    onChange={onGoturenChanged}
                />
                
            </form>
            <div className="form__action-buttons-wrapper">
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveNoteClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    {deleteButton}
                </div>
            </div>
        </div>
    )

    return content
}

export default EditNoteForm