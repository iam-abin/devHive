import React from "react";
import { formatDateWithTime } from "../../utils/date-functions";
import { TiTick } from "react-icons/ti";
import { CONSTANTS } from "../../utils/constants";

const Message: React.FC<{
    message: any;
    userId: string;
    senderImage: string;
	receiver: any;
}> = ({ message, userId, senderImage, receiver }) => {
    // console.log(message);
    // console.log(userId);
    
    return (
        <>
            {message.senderId === userId ? (
                // Shows senders message in the right side
                <div className="chat chat-end mt-3 ">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={`${senderImage }`}
                            />
                        </div>
                    </div>
                    <div className="chat-header flex">
                        {/* To show data and time */}
                        <time className="text-xs opacity-50">
                            {formatDateWithTime(message.createdAt)}
                        </time>

                        {/* To show  double tick */}
                        {message.senderId == userId && message.read ? (
                            <>
                                <TiTick className="text-blue-700" />
                                <TiTick className="text-blue-700" />
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* To show message text */}
                    <div className="chat-bubble shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                        {message.textMessage}
                    </div>
                </div>
            ) : (
                // Shows receivers  message in the left side
                <div className="chat chat-start ">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={`${receiver &&
                                    receiver.profileImage
                                        ? receiver.profileImage
                                        :  receiver.role === "candidate"? CONSTANTS.CANDIDATE_DEFAULT_PROFILE_IMAGE:  CONSTANTS.RECRUITER_DEFAULT_PROFILE_IMAGE }`}
                            />
                        </div>
                    </div>
                    <div className="chat-header ">
                        <time className="text-xs opacity-50">
                            {formatDateWithTime(message.createdAt)}
                        </time>
                    </div>
                    <div className="chat-bubble shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] whitespace-normal">
                        {message.textMessage}
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
