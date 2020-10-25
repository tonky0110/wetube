import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", {
    pageTitle: "Join",
  });
};

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      password2
    },
  } = req;
  if (password !== password2) {
    req.flash('error', "Password dont match.");
    res.status(400);
    res.render("join", {
      pageTitle: "Join",
    });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "Log In",
  });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: 'Welcome',
  failureFlash: "Can't log in. Check email / password."
});

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  try {
    // console.log(accessToken, refreshToken, profile, cb);
    const {
      _json: {
        id,
        avatar_url: avatarUrl,
        name,
        email
      } = {}
    } = profile;
    const user = await User.findOne({
      email,
    });
    console.log(user);

    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    console.error(errro);
    return cb(error);
  }
};

export const logout = (req, res) => {
  // To Do: Process Log Out
  req.flash('info', "Logged out, see you later.");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const {
    user: {
      id
    }
  } = req;
  const user = await User.findById(id).populate('videos');
  console.log(user);
  res.render("userDetail", {
    pageTitle: "User Detail",
    user: user,
  });
};

export const userDetail = async (req, res) => {
  const {
    params: {
      id
    },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(id, user);
    res.render("userDetail", {
      pageTitle: "User Detail",
      user,
    });
  } catch (error) {
    req.flash('error', "User not found.");
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile",
  });

export const postEditProfile = async (req, res) => {
  const {
    body: {
      name,
      email,
    },
    file
  } = req;
  console.log(`postEditProfile name: ${name}, email: ${email}, file: `, file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl
    });
    req.flash('success', "Profile updated.")
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', "Can't updated profile.")
    console.error(error);
    res.redirect(routes.editProfile);
  }
}
export const getChangePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password",
  });

export const postChangePassword = async (req, res) => {
  const {
    body: {
      oldPassword,
      newPassword,
      newPassword1
    }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash('error', "Password don't match.");
      res.status(400);
      res.redirect(`${routes.users}${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword1);
    res.redirect(`${routes.users}${routes.me}`);
  } catch (error) {
    req.flash('error', "Can't change password.");
    console.error(error);
    res.redirect(`${routes.users}${routes.changePassword}`);
  }
}