const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../service/Mailer');
const surveyTemplate = require('../service/emailTemplate/surveyTemplate');
const { application } = require('express');

const Survey = mongoose.model('survey');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank for voting');
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.post('/api/survey', requireLogin, requireCredit, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // console.log('req.body : ', req.body);
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({
        email: email.trim(),
      })),
      _user: req.user.id,
      dateSend: Date.now(),
    });

    // console.log(survey);

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
