import { ApiGet, ApiPost, ApiDelete, ApiPut, ApiParameter } from "restClient/index";

export default class UserApi {
    
    @ApiGet(
        "user",
        ApiParameter.ifNoneMatch()
    )
    getCurrentUser(etag = null){    
    }

    @ApiGet(
        "users/{userId}",
        ApiParameter.path('userId'),
        ApiParameter.ifNoneMatch(),
        ApiParameter.query('includeDeleted'))
    getUser(userId, etag, includeDeleted){    
    }

    updateUser(userId, user ){    
    }
}