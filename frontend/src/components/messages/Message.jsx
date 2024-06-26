import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {
	const {authUser} = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? 'bg-white-500' : '';
	const shakeClass = message.shouldShake ? 'shake' : "";
	
    return (
        <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' 
					src={profilePic} 
                    />
				</div>
			</div>
			{message?.text ? (
				<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message?.text}</div>
			) : (
				<img src={message?.photo} className={`w-40 bg-transparent h-auto rounded-lg ${bubbleBgColor} ${shakeClass}`} />
			) }
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
    )
}

export default Message