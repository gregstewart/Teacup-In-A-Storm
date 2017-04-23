import dotEnv from 'dotenv';
import 'babel-polyfill';
import chai from 'chai';
import isCI from 'is-ci';

global.expect = chai.expect;

if (!isCI) {
  dotEnv.config();
}
