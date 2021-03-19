exports.getImages = (req, res, next) => {
  // response: JSON (array with image objects)
  const images = [
    { url: "http://localhost:5001/statics/profile-images/weirdbeans.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdbus.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirddog.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdpencil.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdturban.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdpig.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdpriestess.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdtea.jpg" },
    { url: "http://localhost:5001/statics/profile-images/weirdjohn.jpg" },
  ];

  res.json(images);
};
