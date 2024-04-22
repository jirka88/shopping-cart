class Filter {
  getQuery(req) {
    const states = req.query.state?.toUpperCase()
    const content = req.query.content
    const dateFrom = req.query.dateFrom ? new Date(req.query.dateFrom) : null
    const dateTo = req.query.dateTo ? new Date(req.query.dateTo) : null
    this.query = {}

    if (states) {
      this.query.state = { $in: states }
    }
    if (content) {
      this.query.slug = { $in: content }
    }
    if (dateFrom || dateTo) {
      if (dateFrom && dateTo) {
        this.query.createdAt = {
          $gte: dateFrom,
          $lte: dateTo,
        }
      } else if (dateFrom) {
        this.query.createdAt = { $gte: dateFrom }
      } else {
        this.query.createdAt = { $lte: dateTo }
      }
    }
    return this.query
  }
}

module.exports = Filter
