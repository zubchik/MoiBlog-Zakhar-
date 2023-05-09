import PostModel from '../models/Post.js';


export const getLastTags = async (req,res) => {
    try { 
      const posts = await PostModel.find().limit(5).exec();
      
      const tags = posts.map(obj => obj.tags).flat().slice(0, 5);

      res.json(tags);

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Did not manage to get tags',
        });
    }
};

export const getAll = async (req,res) => {
    try { 
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Did not manage to get article',
        });

    }

};

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      ).exec();
  
      if (!updatedPost) {
        return res.status(404).json({
          message: "Artice is not found",
        });
      }
  
      res.json(updatedPost);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Did not manage to get article",
      });
    }
  };
  

  export const remove = async (req, res) => {
    try {
      const postId = req.params.id;
      const doc = await PostModel.findOneAndDelete({ _id: postId });
  
      if (!doc) {
        return res.status(404).json({
          message: 'Artice is not found',
        });
      }
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Did not manage to get article',
      });
    }
  };
  




export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Did not manage to get article',
        });
    }
};

export const update = async (req,res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        },
    );

    res.json({
        success: true,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Did not manage to get article',
        });
    }
};