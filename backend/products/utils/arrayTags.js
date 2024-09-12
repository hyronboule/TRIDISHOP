const arrayTags = (tags) => {
  
    if (typeof tags === 'string') {
        try {
            tags = JSON.parse(tags);
        } catch (e) {
            return res.status(400).json({ message: 'Invalid tags format' });
        }
    }

    if (Array.isArray(tags)) {
        return tags;
    } else {
        return res.status(400).json({ message: 'Tags should be an array' });
    }
}


module.exports = {arrayTags}