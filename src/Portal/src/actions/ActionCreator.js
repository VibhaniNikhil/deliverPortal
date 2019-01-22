
/**
 * Used to specify a function returns an action.
 * @param {string} actionName The name of the action, if not specified this default to the method name.
 */
export default function ActionCreator(actionName = null) {
    return function decorator(target, name, descriptor) {
        descriptor.value.action = actionName || descriptor.value.name;
        descriptor.value.actionSuccess = `${descriptor.value.action}_SUCCESS`;
        descriptor.value.actionFailed = `${descriptor.value.action}_FAILED`;
        descriptor.value.actionCanceled = `${descriptor.value.action}_CANCEL`;
    };
}