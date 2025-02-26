const titleRE = /<\/?[^>]+(>|$)/g;

function parseContent(text) {
    return {
        name: text.replace(titleRE, ''),
    };
}

module.exports = function heading(text, level) {
    const { name } = parseContent(text);
    return `<v-header class="svc-doc-header" text="${name}" level=${level} :base-url="'#' + $route.path">${text}</v-header>`;
};

