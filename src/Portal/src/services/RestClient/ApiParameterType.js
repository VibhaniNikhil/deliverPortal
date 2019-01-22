
const ApiParameterType = Object.freeze({
    Path:   Symbol("Path"),
    Header:  Symbol("Header"),
    Query:  Symbol("Query"),
    QueryMap:  Symbol("QueryMap"),
    Body: Symbol("Body")
});

export default ApiParameterType;
