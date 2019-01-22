
const TokenType = {
    TemplateParameter: 0,
    Value: 1,
    LevelSeperator: 2
};

var templateCache = [];

export default class UriTemplate{
    constructor(template){
        this.template = template;
        this.tokens = UriTemplate.parseUri(template);
    }    

    static buildFromTemplate(template, parameters){
        var uriTemplate = templateCache[template];
        if (!uriTemplate){
            templateCache[template] = uriTemplate = new UriTemplate(template);
        }

        return uriTemplate.build();
    }

    static extract(template, uriPath) {

        uriPath = uriPath || window.location.pathname;

        var templateTokens = ParseUri(template);
        var uriTokens = ParseUri(uriPath);
        var result = {};

        for (var index = 0; index < templateTokens.length && index < uriTokens.length; index++) {
            if (templateTokens[index].type == TokenType.TemplateParameter && uriTokens[index].type == TokenType.Value) {
                result[templateTokens[index].value] = uriTokens[index].value;
            }
        }

        return result;
    }

    static isMatch(template, uriPath) {

        uriPath = uriPath || window.location.pathname;

        var templateTokens = ParseUri(template);
        var uriTokens = ParseUri(uriPath);
        var result = {};

        if (templateTokens.length > uriTokens.length) {
            if (templateTokens.length - 1 != uriTokens.length || templateTokens.length[templateTokens.length - 1] != '/') {
                return null;
            }
        }
        else if (uriTokens.length > templateTokens.length) {
            if (uriTokens.length - 1 != templateTokens.length || uriTokens.length[uriTokens.length - 1] != '/') {
                return null;
            }
        }

        for (var index = 0; index < templateTokens.length && index < uriTokens.length; index++) {
            switch (templateTokens[index].type) {
                case TokenType.TemplateParameter:
                    if (uriTokens[index].type != TokenType.Value) {
                        return null;
                    }

                    result[templateTokens[index].value] = uriTokens[index].value;
                    break;

                case TokenType.Value:
                    if (uriTokens[index].type != TokenType.Value) {
                        return null;
                    }

                    if (templateTokens[index].value.toLowerCase() != uriTokens[index].value.toLowerCase()) {
                        return null;
                    }

                    break;

                case TokenType.LevelSeperator:
                    if (uriTokens[index].type != templateTokens[index].type) {
                        return null;
                    }

                    break;
            }
        }

        return result;
    }

    static parseUri(value) {

        let tokens = [];
        for (let index = 0; index < value.length; index++) {
            let start = index;
            let length = 1;

            if (value[index] == '/') {
                tokens.push({ type: TokenType.LevelSeperator });
            }
            else if (value[index] == '{') {
                while (index < value.length + 1 && value[index + 1] != '}') {
                    length++;
                    index++;
                }

                index++;
                tokens.push({ 
                    type: TokenType.TemplateParameter, 
                    value: value.substr(start + 1, length - 1) 
                });
            }
            else {
                while (index < value.length + 1 && value[index + 1] != '/') {
                    length++;
                    index++;
                }

                tokens.push({ 
                    type: TokenType.Value, 
                    value: value.substr(start, length) 
                });
            }
        }

        return tokens;
    }

    build(parameters){
        let output = "";
        for (let index = 0; index < this.tokens.length; index++){
            let token = this.tokens[index];
            if (token.type === TokenType.LevelSeperator){
                output += "/";
            }
            else if (token.type === TokenType.Value){
                output += token.value;
            }
            else if (token.type === TokenType.TemplateParameter){
                let parameterValue = parameters[token.value];
                if (!parameterValue){
                    throw new Error(`Error creating uri, cannot bind parameter ${token.value}.`)
                }

                output += parameterValue;
            }
        }

        return output;
    }
} 