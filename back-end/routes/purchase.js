const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');

const Phone = require('mongoose').model('Phone');
const Purchase = require('mongoose').model('Purchase');

router.post('/create/:phoneId/:userId', authCheck, async(req, res, next) => {
    let phoneId = req.params.phoneId
    let userId = req.params.userId
    try {
        let result = await Purchase.create({
            creator: userId,
            phone: phoneId,
            date: Date.now(),
        })

        console.log('Purchase add')
        res.status(200).json({
            success: true,
            message: 'Successfully add purchase.',
            purchase: result
        });
    } catch (error) {
        console.log('Purchase not add')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }



});
router.get('/status/:userId',authCheck, async(req, res, next) => {
    let userId = req.params.userId
    if (req.user.isAdmin) {
        let orderStatus = ['Pending', 'In Progress', 'In Transit', 'Delivered']
        try {
            let purchase = await Purchase.find({}).populate({ path: 'phone', select: 'brand model' })
            for (let o of purchase) {               
                o.statusOption = orderStatus.filter(s => s != o.status)              
            }
            res.status(200).json({
                success: true,
                purchase: purchase
            });

        } catch (error) {
            res.status(201).json({
                success: false,
                message: error.message
            });
        }
    } else {

        try {
            let purchase = await Purchase.find({
                creator: userId
            }).populate('phone').populate({ path: 'phone', select: 'brand model' })
            res.status(200).json({
                success: true,
                purchase: purchase
            });
        } catch (error) {
            res.status(201).json({
                success: false,
                message: error.message
            });
        }
    }
});
router.post('/status',roleCheck('Admin'), async(req, res, next) => {
    try {
        for (let order in req.body) {
            await Purchase.findByIdAndUpdate(order, {status: req.body[order]})
         } 
         res.status(200).json({
            success: true,
            message: 'Purchase are updated successfully'
        });
    } catch (error) {
        res.status(201).json({
            success: false,
            message: error.message
        });
    }
});



module.exports = router;