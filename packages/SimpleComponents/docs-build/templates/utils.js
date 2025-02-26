function mdclean(input) {
    if (typeof input !== 'string') {
        return `${input}` || '-';
    }
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br/>') || '-';
}

exports.mdclean = mdclean;

