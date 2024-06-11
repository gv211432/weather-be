import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import { Router } from 'express';
import User from '../models/User';
import { digestError } from './logger';

const router = Router();

// Middleware
router.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());


// Local strategy for email and password login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (error: any) {
    await digestError('Error in local strategy', error);
    return done(error);
  }
}));


// Facebook strategy for social login
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.OAUTH_REDIRECT_BASEURL}/api/user/auth/facebook/callback`,
  profileFields: ['id', 'displayName', 'emails']
} as unknown as any, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email,
        facebookId: profile.id
      });
    } else {
      user.facebookId = profile.id;
      await user.save();
    }
    return done(null, user);
  } catch (error: any) {
    await digestError('Error in facebook strategy', error);
    return done(error);
  }
}));


// Google strategy for social login
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  callbackURL: `${process.env.OAUTH_REDIRECT_BASEURL}/api/user/auth/google/callback`
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    const email = profile.emails[0].value;
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email,
        googleId: profile.id
      });
    } else {
      user.googleId = profile.id;
      await user.save();
    }
    return done(null, user);
  } catch (error: any) {
    await digestError('Error in google strategy', error);
    return done(error);
  }
}));


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error: any) {
    await digestError('Error in deserialize user', error);
    done(error);
  }
});


export default router;