
function ApiResponse(contentType) {
    return function decorator(target, name, descriptor) {
        if (!descriptor.value.apiFunction){
            descriptor.value.apiFunction = {};
        }

        descriptor.value.apiFunction = { httpMethod: httpMethod, template: template };
        return descriptor;
    };
}

function JsonResponse() {
    return new ApiResponse('application/json');
}

function BinaryResponse() {
    return new ApiResponse('application/octet-stream');
}

export { ApiResponse, JsonResponse, BinaryResponse }