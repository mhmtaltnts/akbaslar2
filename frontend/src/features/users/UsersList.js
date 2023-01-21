import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const UsersList = () => {
    useTitle('Kullanıcı Listesi')

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
            <div className="user-table">
                <h1 style={{textAlign: "center", padding: "15px"}}>Kullanıcılar Listesi</h1>

                <table className="table table_users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">Kullanıcı Adı</th>
                            <th scope="col" className="table__th user__roles">Görevi</th>
                            <th scope="col" className="table__th user__edit">Düzenle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>

            </div>
            
        )
    }

    return content
}
export default UsersList