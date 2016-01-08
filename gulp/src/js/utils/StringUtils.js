
export function projectSlashes (str) {
    return (str + '').replace(/\//g, '\\\/');
}



export default {
    projectSlashes: projectSlashes
};