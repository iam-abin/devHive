import usersRepository from '../../repositories/mongo/users.repository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleMessage = (data: any, topic: string) => {
    switch (topic) {
        case 'USER-UPDATED-TOPIC':
            usersRepository.updateUser(data.userId, data);
            break;

        default:
            break;
    }
};
