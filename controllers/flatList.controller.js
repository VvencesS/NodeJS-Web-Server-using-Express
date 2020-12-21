const FlatListData = require('../models/flatList.model');

class FlatListDataController {
    async index(req, res) {
        let flatListData = await FlatListData.find();
        res.json(flatListData);
    };

    insertNewFood(req, res, next) {
        const flatListData = new FlatListData(req.body);
        flatListData
            .save()
            .then(() => res.send({result: 'success'}))
            .catch(next);
    }

    updateAFood(req, res, next) {
        FlatListData.updateOne({ _id: req.body._id }, req.body)
          .then(() => res.send({result: 'success'}))
          .catch(next);
      }
}

module.exports = new FlatListDataController();
