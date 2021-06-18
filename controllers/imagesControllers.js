const env = require('../config/config');

exports.getImages = (req, res, next) => {
  // response: JSON (array with image objects)
  const images = [
    { url: `${env.serverBase}/statics/profile-images/weirdbeans.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdbus.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirddog.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdpencil.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdturban.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdpig.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdpriestess.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdtea.jpg` },
    { url: `${env.serverBase}/statics/profile-images/weirdjohn.jpg` },
  ];

  res.json(images);
};
