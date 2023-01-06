import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`Gebze Konak Parkı: ${username}`)

    

    const content = (
        <section className="welcome">

            <h1>Hoşgeldiniz!</h1>

            <p><Link to="/dash/notes">Tüm Kayıtlar</Link></p>

            <p><Link to="/dash/notes/new">Yeni Kayıt Ekle</Link></p>

            <p><Link to="/dash/rapor">Rapor</Link></p>
            

            {(isManager || isAdmin) && <p><Link to="/dash/users">Kullanıcılar ve Ayarlar</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Yeni Kullanıcı Ekle</Link></p>}

        </section>
    )

    return content
}
export default Welcome