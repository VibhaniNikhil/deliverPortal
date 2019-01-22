import ActionCreator from './ActionCreator'

export default class UserManagement {

    @ActionCreator
    static deleteUser(userId, etag) {
        return {
            type: UserManagement.deleteUser.action,
            payload: {
                userId: userId,
                etag: etag
            }
        };
    };


    @ActionCreator
    static getUserDetails(userId, etag) {
        return {
            type: UserManagement.getUserDetails.action,
            payload: {
                userId: userId,
                etag: etag
            }
        };
    };
}
