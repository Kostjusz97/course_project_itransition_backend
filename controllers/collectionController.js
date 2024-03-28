 const {Collection} =require('../models/models')
 const ApiError = require('../error/ApiError')

 function extractCollectionData(data) {
    const {
        name, description, user_id, category_id, image_url, 
        custom_int1_state, custom_int1_name,
        custom_int2_state, custom_int2_name,
        custom_int3_state, custom_int3_name,
        custom_string1_state, custom_string1_name,
        custom_string2_state, custom_string2_name,
        custom_string3_state, custom_string3_name,
        custom_text1_state, custom_text1_name,
        custom_text2_state, custom_text2_name,
        custom_text3_state, custom_text3_name,
        custom_boolean1_state, custom_boolean1_name,
        custom_boolean2_state, custom_boolean2_name,
        custom_boolean3_state, custom_boolean3_name,
        custom_date1_state, custom_date1_name,
        custom_date2_state, custom_date2_name,
        custom_date3_state, custom_date3_name
    } = data;
    return {
        name, description, user_id: user_id, category_id: category_id, image_url, 
        custom_int1_state, custom_int1_name,
        custom_int2_state, custom_int2_name,
        custom_int3_state, custom_int3_name,
        custom_string1_state, custom_string1_name,
        custom_string2_state, custom_string2_name,
        custom_string3_state, custom_string3_name,
        custom_text1_state, custom_text1_name,
        custom_text2_state, custom_text2_name,
        custom_text3_state, custom_text3_name,
        custom_boolean1_state, custom_boolean1_name,
        custom_boolean2_state, custom_boolean2_name,
        custom_boolean3_state, custom_boolean3_name,
        custom_date1_state, custom_date1_name,
        custom_date2_state, custom_date2_name,
        custom_date3_state, custom_date3_name
    };
}

 class CollectionController {

    async create(req, res, next) {
        try {
            const collectionData = extractCollectionData(req.body);
            const candidateCol = await Collection.findOne({ where: { name: collectionData.name } });
            if (candidateCol) {
                return next(ApiError.badRequest('Collection with name already exists'));
            }
            const collection = await Collection.create(collectionData);
            return res.json(collection);
        } catch (error) {
            return next(ApiError.internal('Failed to create collection', error));
        }
    }

    async getMyCollections(req, res) {
        const userId = req.params.id; 
        try {
            const collections = await Collection.findAll({ where: { user_id: userId } });
            if (collections.length > 0) {
                return res.json(collections);
            } else {
                return res.status(404).json({ error: 'Collections not found for the user' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve collections for the user', details: error });
        }
    }
    
    async getOne(req, res) {
        const id = req.params.id
        try {
            const collection = await Collection.findByPk(id)
            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' })
            }
            res.json(collection)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve collection' })
        }
    }

    async getAll(req, res) {
        try {
            const collections = await Collection.findAll()
            res.json(collections)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve collections' })
        }
      }

      async remove(req, res) {
        const id = req.params.id
        try {
            const collection = await Collection.findByPk(id)
            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' })
            }
            await collection.destroy()
            return res.json({ message: 'Collection removed successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to remove collection' })
        }
      }

      async update(req, res) {
        const id = req.params.id;
        try {
            const collection = await Collection.findByPk(id);
            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' });
            }
            const collectionData = extractCollectionData(req.body);
            await collection.update(collectionData);
            return res.json({ message: 'Collection updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update collection' });
        }
    }

 }

 module.exports = new CollectionController()