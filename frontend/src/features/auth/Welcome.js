import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`Gebze Konak Parkı: ${username}`)

    

    const content = (
        <section className="welcome">

            <h1>Hoşgeldiniz!</h1>


            <p className='welcome-link'><Link to="/dash/notes/new">Yeni Kayıt Ekle</Link></p>            

            {(isManager || isAdmin) && <p className='welcome-link'><Link to="/dash/users/new">Yeni Kullanıcı Ekle</Link></p>}

            {(isManager || isAdmin) && <p className='welcome-link'><Link to="/dash/users">Kullanıcılar ve Ayarlar</Link></p>}
            <p className='welcome-link'><Link to="/dash/notes">Tüm Kayıtlar</Link></p>
            <p className='welcome-link'><Link to="/dash/rapor">Rapor</Link></p>

        </section>
    )

    return content
}
export default Welcome