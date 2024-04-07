const asyncHandler = require('express-async-handler')
const LogModel = require('../models/logModel')

// Log the request method and URL
const logMiddleware = asyncHandler(async (req, res, next) => {
    try {
        // Créer une instance du modèle Log avec les données de la requête
        const log = LogModel.create({
        method: req.method,
        url: req.originalUrl
        });

        next();

    } catch (err) {
        console.error('Erreur lors de l\'enregistrement du log:', err);
        next(err);
    }
});

module.exports = { logMiddleware }