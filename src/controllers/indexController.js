const db = require('../database/models');
const {format} = require('date-fns');
const paginate = require('express-paginate');

module.exports = {
    index : (req,res) => {

        const thumb = db.Movie.findAll({where : {thumbnail_show : true}});
        const banner = db.Movie.findAll({where : {banner_show : true}});
        const lastests = db.Movie.findAll({
            limit : 4,
            order : [['release_date','DESC']]
        });
        const popular = db.Movie.findAll({
            limit : 4,
            order : [['rating','DESC']]
        });

        const winners = db.Movie.findAll({
            limit : 4,
            order : [['awards','DESC']]
        })

        Promise.all([thumb, banner, lastests, popular, winners])
            .then(([thumb, banner, lastests, popular, winners]) => {
                return res.render('index',{
                    thumb,
                    banner,
                    lastests,
                    popular, 
                    winners,
                    format
                })
            }).catch(error => console.log(error))

    },
    review : (req,res) => {
        db.Movie.findAndCountAll({
            limit : req.query.limit,
            offset : req.skip
        })
        .then(({count, rows}) => {
            const itemCount = count;
            const pageCount = Math.ceil(count / req.query.limit);
            return res.render('review',{
                movies : rows,
                pageCount,
                itemCount,
                pages : paginate.getArrayPages(req)(3, pageCount,req.query.page),
                currentPage : req.query.page
                
            })
        })
        .catch(error => console.log(error))
    },
    admin : (req,res) => {
        return res.render('admin/index')
    }
}