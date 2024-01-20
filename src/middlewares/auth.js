export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        console.log("Yeah");
        next();
    } else{
            res.redirect('/recruiterlogin'); 
        }
    };
