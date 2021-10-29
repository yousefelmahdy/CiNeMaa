function admin (req, res, next)
{
    if(!req.user.isAdmin) return res.status(403).send('acess denied you are not admin');
    next();

}

module.exports = admin;