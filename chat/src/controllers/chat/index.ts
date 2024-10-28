import getAllChatRoomsByUserIDController from './getChatRooms.controller';
import getConversationController from './getChatRoom.controller';

import { IDependency } from '../../frameworks/types/dependency';

export = (dependencies: IDependency) => {
    return {
        getAllChatRoomsByUserIDController: getAllChatRoomsByUserIDController(dependencies),
        getConversationController: getConversationController(dependencies),
    };
};
