const express = require('express');
const router = express.Router();
const EmployeeController = require('../app/controllers/EmployeeController');


router.get("/employee/join",EmployeeController.list)
router.get("/search",EmployeeController.search)

router.get("/employee",EmployeeController.index)
router.get('/create', EmployeeController.create);
router.post('/save',  EmployeeController.save);
router.get('/employee/:id/edit', EmployeeController.edit);
router.put('/employee/:id/update', EmployeeController.update);
router.delete('/delete/:id', EmployeeController.delete);




module.exports = router;
