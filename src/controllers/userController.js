import routes from '../routes';

export const getJoin = (req, res) => {
    return res.render('join', {
        pageTitle: 'Join'
    });
}

export const postJoin = (req, res) => {
    const {
        body: {
            name = '',
            email = '',
            password = '',
            password2 = ''
        } = {}
    } = req;
    if (password === '' || password !== password2) {
        // console.log(`password: ${password}, password2: ${password2}`)
        res.status(400);
        res.render('join', {
            pageTitle: "Join"
        })
    } else {
        // todo: Register User
        // to Do: User Log in
        // ...
        res.redirect(routes.home);
    }
};

export const login = (req, res) => res.render('login', {
    pageTitle: 'Login'
});

export const logout = (req, res) => res.render('logout', {
    pageTitle: 'Logout'
});
// 
export const users = (req, res) => res.render('users', {
    pageTitle: 'Users'
});

export const userDetail = (req, res) => res.render('userDetail', {
    pageTitle: 'User Detail'
});

export const editProfile = (req, res) => res.render('editProfile', {
    pageTitle: 'Edit Profile'
});

export const changePassword = (req, res) => res.render('changePassword', {
    pageTitle: 'Change Password'
});