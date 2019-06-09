export const addContentTypeIfNotDefined = (contentType) => (req, res, next) => {
    if (req.header('content-type')) {
      req.headers['content-type'] = contentType;
    }
    next();
  }
