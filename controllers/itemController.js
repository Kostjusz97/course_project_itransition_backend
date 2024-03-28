const {Item} =require('../models/models')
const ApiError = require('../error/ApiError')

const extractItemDataFromRequest = (req) => {
    const {
        name, tags, custom_int1, custom_int2, custom_int3,
        custom_string1, custom_string2, custom_string3,
        custom_text1, custom_text2, custom_text3,
        custom_boolean1, custom_boolean2, custom_boolean3,
        custom_date1, custom_date2, custom_date3,
        collection_id
    } = req.body;

    return {
        name, tags, custom_int1, custom_int2, custom_int3,
        custom_string1, custom_string2, custom_string3,
        custom_text1, custom_text2, custom_text3,
        custom_boolean1, custom_boolean2, custom_boolean3,
        custom_date1, custom_date2, custom_date3,
        collection_id: collection_id
    };
};

class ItemController {

    async create(req, res, next) {
        try {
            const itemData = extractItemDataFromRequest(req);
            const item = await Item.create(itemData);
            return res.json(item);
        } catch (error) {
            return next(ApiError.internal('Failed to create item'));
        }
    }

    async getOne(req, res) {
        const id = req.params.id
        try {
            const item = await Item.findByPk(id)
            if (!item) {
                return res.status(404).json({ error: 'Item not found' })
            }
            res.json(item)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve item' })
        }
    }

    async getCollectionItems(req, res) {
        const collectionId = req.params.id; 
        try {
            const items = await Item.findAll({ where: { collection_id: collectionId } });
            if (items.length > 0) {
                return res.json(items);
            } else {
                return res.status(404).json({ error: 'Items not found for the user' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve items for the user', details: error });
        }
    }

    async getAll(req, res) {
        try {
            const items = await Item.findAll()
            res.json(items)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve items' })
        }
      }

      async remove(req, res) {
        const id = req.params.id
        try {
            const item = await Item.findByPk(id)
            if (!item) {
                return res.status(404).json({ error: 'Item not found' })
            }
            await item.destroy()
            return res.json({ message: 'Item removed successfully' })
        } catch (error) {
            return res.status(500).json({ error: 'Failed to remove item' })
        }
      }

      async update(req, res, next) {
        const id = req.params.id;

        try {
            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const itemData = extractItemDataFromRequest(req);
            await item.update(itemData);
            return res.json({ message: 'Item updated successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to update item'));
        }
    }

}

module.exports = new ItemController()