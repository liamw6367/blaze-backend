module.exports = (str, is_xhtml) => {
    str = str.replace(/\n$/,'');
    console.log("LINE BREAK:" + str.replace(/\n/,""))
    let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};
