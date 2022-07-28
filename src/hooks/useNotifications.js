import { useQuery } from 'react-query';
const useNotifications = () => {
        const {data: messages, isLoading1, refetch} = useQuery('messages', ()=>fetch('http://localhost:5000/notifications',{
            method: 'GET', 
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json()));

        return [messages, isLoading1, refetch];

};

export default useNotifications;