const arrayTags = (tags, res) => {
    const tagRegex = /^[\p{L}]+(?:\s*[\p{L}]*)*$/u; // Letters with accents, optional spaces between words

    if (typeof tags === 'string') {

        try {

            tags = JSON.parse(tags);
        } catch (e) {

            return { error: true, message: 'Invalid tags format' };
        }
    }

    if (Array.isArray(tags)) {

        for (const tag of tags) {

            if (typeof tag !== 'string' || !tagRegex.test(tag)) {

                return { error: true, message: `Invalid tag: ${tag}` };
            }
        }
        return { error: false, data: tags };
    }
    
    return { error: true, message: 'Tags should be an array' };
};


module.exports = { arrayTags }