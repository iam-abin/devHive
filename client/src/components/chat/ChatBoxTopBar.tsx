import React from "react";
import { CONSTANTS } from "../../utils/constants";

const ChatBoxTopBar: React.FC<{
    receiver: any;
    isOnline: any;
    handleBackButtonClick: any;
    userImage: string;
}> = ({ receiver, isOnline }) => {
    

    return (
        <div>
            <div className="card w-full bg-base-100 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-1">
                <div className="flex flex-row p-4 gap-3 items-center ">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={
                                    receiver[0]?.profileImage
                                        ? receiver[0]?.profileImage
                                        : receiver[0]?.role === "candidate"
                                        ? CONSTANTS.CANDIDATE_DEFAULT_PROFILE_IMAGE
                                        : CONSTANTS.RECRUITER_DEFAULT_PROFILE_IMAGE
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <h5>{receiver[0]?.name}</h5>
                        <p>{isOnline ? "online" : "offline"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBoxTopBar;
