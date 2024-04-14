class Filter {
    getQuery(req) {
        const states = req.query.state;
        const content = req.query.content;
        this.query = {};

        if(states?.length > 0) {
            this.query.state = { $in: states };
        }
        if(content?.length > 0) {
            this.query.slug = {$in: content}
        }

        return this.query;
    }
}
module.exports = Filter;