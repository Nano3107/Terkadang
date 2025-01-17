const mobil = require('../models/index').mobil
const path = require('path')
const Op = require('sequelize').Op
const fs = require('fs')
const upload = require('./image').single('filename')

exports.addMenu = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: "No file" })
        }

        let newMenu = {
            name: request.body.name,
            jenis : request.body.name,
            image: request.file.filename
        }
        console.log(newMenu)
        mobil.create(newMenu)
        .then (result => {
            return response.json({
                status: true, 
                data: result,
                message:"success"
            })
        })
        .catch (error => {
            return response.json({
                status: false, 
                error: error.message
            })
        })
    })
}

exports.updateMenu = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let id = request.params.id
        let updatedMenu = {
            name: request.body.name,
            jenis : request.body.name,
            // image: request.file.filename
        }
        if (request.file) {
            const menu = await mobil.findOne({
                where: { id: id }
            })
            const fotolama = menu.image
            const pathfoto = path.join(__dirname, '../image', fotolama)
            if (fs.existsSync(pathfoto)) {
                fs.unlinkSync(pathfoto, error => console.log(error))
            }
            updatedMenu.image = request.file.filename
        }
        mobil.update(updatedMenu, { where: { id: id } })
            .then(result => {
                if (result[0] === 1) {
                    return mobil.findByPk(id)
                        .then(updatedMenu => {
                            return response.json({
                                success: true,
                                data: updatedMenu,
                                message: 'Data mobil has been updated'
                            })
                        })
                        .catch(error => {
                            return response.json({
                                success: false,
                                message: error.message
                            })
                        })
                } else {
                    return response.json({
                        success: false,
                        message: 'Data mobil not found or not updated'
                    })
                }
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.deleteMenu = async (request, response) => {
    const id = request.params.id
    const menu = await mobil.findOne({ where: { id: id } })
    const oldPhoto = menu.image;
    const pathFoto = path.join(__dirname, '../image', oldPhoto)

    if (fs.existsSync(pathFoto)) {
        fs.unlinkSync(pathFoto, (error) => console.log(error))
    }

    mobil.destroy({ where: { id: id } })
        .then(result => {
            return response.json({
                success: true,
                data: menu,
                message: 'mobil deleted'
            })
        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}

exports.searchMenu = async (request, response) => {
    let search = request.params.search
    let menu = await mobil.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: search } },
                { jenis: { [Op.substring]: search } },
                { price: { [Op.substring]: search } },
            ]
        }
    })
    return response.json({ 
        success: true,
        data: menu,
        message: 'All mobil loaded'
   })
}