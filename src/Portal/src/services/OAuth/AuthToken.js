function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

function parseRoles(claims){
    if (!claims || !claims.roles){
        return [];
    }

    return claims.roles.split('|');
}


export default class AuthToken{
    token;
    refreshToken;
    expiresIn;
    tokenType;
    timestamp;
    claims;

    constructor(token, refreshToken, expiresIn, tokenType){
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.tokenType = tokenType;
        this.claims = parseJwt(token);
        this.roles = parseRoles(this.claims);
        this.timestamp = new Date();
    }
    
    getUserId(){
        return this.claims.userId;
    }

    getPrincipalId(){
        return this.claims.principalId;
    }

    getRoles(){
        return this.roles;
    }

    isExpired(){
        return false;
//        return moment.utc().isAfter(this.expiresAt);
    }
}