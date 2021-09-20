const isAdminRole = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({
            msg: 'You are not authorized to access this route'
        });
    }
    next();
}


const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                msg: `You are not authorized, you need some of these roles ${roles}`
            });
        }
        next();
    }
}

module.exports = { isAdminRole, hasRole };