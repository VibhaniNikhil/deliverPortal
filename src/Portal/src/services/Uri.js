
export default class Uri {
    static createQuery(query){
        var queryString = "";

        for (var name in query) {
            if (!query.hasOwnProperty(name)) {
                continue;
            }
    
            var value = query[name];
            if (!value || value == "") {
                continue;
            }
    
            if (queryString.length == 0) {
                queryString += "?";
            }
            else {
                queryString += "&";
            }
    
            queryString += name + "=" + encodeURIComponent(value);
        }
    
        return queryString;    
    }

    static createFormFields(data){
        var formFields = "";

        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
    
            var value = data[name];
            if (!value || value == "") {
                continue;
            }
    
            if (formFields.length !== 0) {
                formFields += "&";
            }
    
            formFields += name + "=" + encodeURIComponent(value);
        }
    
        return formFields;   
    }
    
    static createFromTemplate(template, values){
        
    }

}


// var TechxRx = TechxRx || {};

// TechxRx.Uri = function () {
// }

// TechxRx.Uri.CreateQueryString = function (query) {
//     var queryString = "";

//     for (var name in query) {
//         if (!query.hasOwnProperty(name)) {
//             continue;
//         }

//         var value = query[name];
//         if (!value || value == "") {
//             continue;
//         }

//         if (queryString.length == 0) {
//             queryString += "?";
//         }
//         else {
//             queryString += "&";
//         }

//         queryString += name + "=" + encodeURIComponent(value);
//     }

//     return queryString;
// }

// TechxRx.Uri.GetQueryParameter = function(name) {
//     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//     var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//     var results = regex.exec(location.search);
//     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

// TechxRx.Uri.GetHashParameter = function (name) {
//     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//     var regex = new RegExp('[\\#&]' + name + '=([^&#]*)');
//     var results = regex.exec(window.location.hash);
//     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
// };

// TechxRx.Uri.ExtractUriParameters = function (template, uriPath) {
//     return UriParser.Instance.ExtractUriParameters(template, uriPath);
// }


