const arrayTags = (tags, res) => {
    const tagRegex = /^[\p{L}]+(?:\s*[\p{L}]*)*$/u; // Letters with accents, optional spaces between words

    if (typeof tags === 'string') {
        console.log("Processing a string...");
        try {
          
            tags = JSON.parse(tags);
        } catch (e) {
            console.log("Failed to parse JSON");
            return { error: true, message: 'Invalid tags format' };
        }
    }

    if (Array.isArray(tags)) {
        console.log("Processing an array...");
        for (const tag of tags) {
            console.log(`Validating tag: ${tag}`);
            if (typeof tag !== 'string' || !tagRegex.test(tag)) {
                console.log(`Invalid tag: ${tag}`);
                return { error: true, message: `Invalid tag: ${tag}` };
            }
        }
        return { error: false, data: tags }; 
    }

    console.log("Tags are neither string nor array");
    return { error: true, message: 'Tags should be an array' };
};


module.exports = {arrayTags}