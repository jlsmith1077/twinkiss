const Profile = require("../models/profile");


exports.profileCreate = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const profile = new Profile({
      username: req.body.username,
      location: req.body.location,
      fullname: req.body.fullname,
      email: req.body.email,
      gender: req.body.gender,
      interest: req.body.interest,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
      friends: []
     });
    profile.save()
    .then(createdProfile => {
      console.log('created Profile', createdProfile);
      res.status(201).json({
        message: "Profile added successfully",
        profile: {
        ...createdProfile,
        id: createdProfile._id
        }
      });
    })
    .catch(error => {
        res.status(500).json({
          message: 'Creating a profile failed'
        });
    });
  };

  exports.socialLogin = () => {
    const url = req.protocol + "://" + req.get("host");
    Profile.findOne({_id: req.body.email}, profile).then(
      results => {
        if(!results) {
          profile = new Profile({
            username: req.body.firstName,
            email: req.body.email,
            imagePath: req.body.photoUrl,
            creator: req.body.id
           });
          profile.save().then(createdProfile => {
            res.status(201).json({
              message: "Profile added successfully",
              profile: {
              ...createdProfile,
              id: createdProfile._id
              }
            });
          })
          .catch(error => {
              res.status(500).json({
                message: 'Creating a profile failed'
              });
          });
        }
      }
    )
  }

  exports.profileEdit = (req, res, next) => {
    console.log('made it to edit');
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const profile = new Profile({
      _id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      imagePath: imagePath,
      location: req.body.location,
      interest: req.body.interest,
      gender: req.body.gender,
      fullname: req.body.fullname,
      creator: req.userData.userId
          });
    Profile.updateOne({ _id: req.params.id, creator: req.userData.userId }, profile)
    .then(result => {
      if (result.n > 0) {
      res.status(200).json({ 
        message: 'Update successful!',
        profile: profile
         });  
    } else {
      res.status(401).json({message: 'Not authorized'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Was not able to update profile '
      })
    });
  }

  exports.profileGet = (req, res, next) => {
    const selectedSort = req.query.sort;
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const profileQuery = Profile.find().collation({locale: 'en_US', strength:1});
    let fetchedProfiles;  
      if(pageSize && currentPage) {
      profileQuery.sort(selectedSort)
      .skip(pageSize * (currentPage -1))
       .limit(pageSize);
       
    }
    profileQuery.then(documents => {
      fetchedProfiles = documents;
       return Profile.count();      
     })
     .then(count => {
       res.status(200).json({
         message: 'Fetched Profiles',
         profiles: fetchedProfiles,
         maxProfiles: count
       });
     })
     .catch(error => {
       res.status(500).json({
         message: 'Was unable to retrieve profile'
       });
     });
   }

   exports.profileDelete = (req, res, next) => {
    Profile.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      if (result.n > 0) {
        res.status(200).json({message: 'Profile Deleted successful'});
      } else {
        res.status(401).json({message: 'Not authorized!...Ugggh'});
      }
    });
  }