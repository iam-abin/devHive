import React, { useEffect } from 'react'

const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async ()=>{
        const response = await axios.get('/asddfasd');
        console.log(response)
    }
    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div>
      Chat page
    </div>
  )
}

export default ChatPage
