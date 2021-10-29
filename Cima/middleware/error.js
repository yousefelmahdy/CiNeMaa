module.exports = function(err,req,res,next)
{
    // internal server error
    res.status(500).send('something failed.');
}